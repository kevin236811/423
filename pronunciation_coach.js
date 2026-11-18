/**
 * 🇧🇷 巴西生意口语 · 智能发音纠音私教 Agent (Pronunciation Coach)
 * 支持：
 *  1. 零配置实时跟读评测：Web Speech API (pt-BR) 多候选听写 + 巴葡音素雷区诊断 + 声学节奏对比
 *  2. 巴葡标准神经语音 1.0x 常速 / 0.7x 慢速拆解 /「先听标准再听自己」AB 镜像回放
 *  3. 自动同步保存真实录音至 audio/my_recordings/latest.wav（支持在 Antigravity 里直接让 AI 亲耳听音纠音）
 *  4. 可选 Gemini 原生多模态音频 API 音素级深度听音诊断
 *  5. 内置「巴西外贸 & WhatsApp 零基础破冰黄金句库」+ 全站课文/单词一键送入教练台
 */
(function () {
  const COACH_STORAGE_KEY = "pt_br_pron_coach_v1";
  const LOCAL_API_BASE =
    location.protocol.startsWith("http") && location.port === "8765"
      ? location.origin
      : "http://127.0.0.1:8765";

  // ─── 巴西外贸 & 零基础必练黄金词句库 ─────────────────────────────────────────
  const BR_BIZ_PACKS = [
    {
      id: "phonetics",
      label: "🎯 巴葡发音破冰（必练 8 词）",
      items: [
        {
          pt: "Bom dia! Tudo bem?",
          zh: "早上好！一切都好吗？（巴葡最高频开场白）",
          guide: "bom [bõ] 词尾 m 不闭唇；dia 读 [ˈdʒi.ɐ]（吉啊）；bem [bẽj̃] 鼻音收尾",
          bizNote: "巴西人无论发 WhatsApp 还是见面，永远先问 Tudo bem?，回答 Tudo ótimo! E você? 即可。"
        },
        {
          pt: "Brasil e China",
          zh: "巴西与中国（注意尾音 -l 和 ch 发音！）",
          guide: "Bra-SIL [bɾaˈziw]（布拉齐乌，s 读 z，l 读乌）；CHI-na [ˈʃi.nɐ]（希娜，ch 读 sh 不读“拆”！）",
          bizNote: "向巴西客户介绍自己来自中国时，把 China 读成 [ˈʃinɐ] 会瞬间拉近专业好感。"
        },
        {
          pt: "Cem reais",
          zh: "一百雷亚尔（巴西货币 Real 的复数）",
          guide: "cem [sẽj̃] 鼻音；re-AIS [heˈajs]（词首 r 读喉音 [h] 如“黑艾斯”，绝不读英语 real！）",
          bizNote: "单数 1 雷亚尔是 um real [ũ heˈaw]，复数是 reais [heˈajs]。谈本地价格必用。"
        },
        {
          pt: "Muito caro / O carro",
          zh: "太贵了 (caro) vs 汽车 (carro) —— 单 r 与双 rr 生死对比",
          guide: "CA-ro [ˈka.ɾu] 舌尖轻弹一下（贵）；CAR-ro [ˈka.hu] 喉咙吐气（汽车）",
          bizNote: "谈价格说 Muito caro（太贵了）如果把 r 读成喉音 h，客户会听成“很多车”！"
        },
        {
          pt: "Não, obrigado. Pão.",
          zh: "不，谢谢。面包。（鼻元音 -ão 核心关）",
          guide: "não [nɐ̃w̃]、pão [pɐ̃w̃] 口腔打开同时让气流过鼻腔，千万别读成 pau [paw]（木棍/粗俗语）",
          bizNote: "男士说谢谢用 obrigado [obɾiˈgadu]，女士自称用 obrigada。"
        },
        {
          pt: "Cliente e pedido",
          zh: "客户与订单（巴葡 t/d 腭化代表词）",
          guide: "cli-EN-te [kliˈẽ.tʃi]（词尾 -te 读“奇”）；pe-DI-do [peˈdʒi.du]（di 读“吉”，尾 -o 读 u）",
          bizNote: "巴西圣保罗/里约口音中，ti/di 以及词尾 -te/-de 一律腭化为 [tʃi] / [dʒi]。"
        },
        {
          pt: "Cotação e desconto",
          zh: "报价单与折扣",
          guide: "co-ta-ÇÃO [kotaˈsɐ̃w̃]（ç 读 s，重音在最后鼻音）；des-CON-to [dʒisˈkõ.tu]",
          bizNote: "发报价单常用 enviar a cotação；给折扣是 dar um desconto。"
        },
        {
          pt: "Prazo e frete",
          zh: "交期/账期 与 运费",
          guide: "PRA-zo [ˈpɾa.zu]（pr 连读轻弹舌，z 读浊音）；FRE-te [ˈfɾɛ.tʃi]（开口 é + 尾音 tʃi）",
          bizNote: "prazo de entrega = 交货期；prazo de pagamento = 付款账期。"
        }
      ]
    },
    {
      id: "icebreak",
      label: "👋 展会 & 初次见面",
      items: [
        {
          pt: "Oi, tudo bem? Prazer em conhecer você!",
          zh: "嗨，你好吗？很高兴认识你！",
          guide: "pra-ZER [pɾaˈzeh]；co-nhe-CER [koɲeˈseh]（nh 读如“尼衣”）；vo-CÊ [voˈse] 重音在尾音节",
          bizNote: "展会接待巴西客商最自然的破冰句，热情大方。"
        },
        {
          pt: "Sou da China. Somos fabricantes diretos.",
          zh: "我来自中国。我们是源头工厂（直接制造商）。",
          guide: "CHI-na [ˈʃinɐ]；fa-bri-CAN-tes [fabɾiˈkɐ̃tʃis]；di-RE-tos [dʒiˈɾɛtus]",
          bizNote: "巴西买家非常看重你是贸易商还是源头工厂（fabricante direto / fábrica）。"
        },
        {
          pt: "Você tem WhatsApp? Vamos manter contato!",
          zh: "你有 WhatsApp 吗？我们保持联系！",
          guide: "巴西人把 WhatsApp 亲切读作 [watʃiˈzap] 或简称 Zap [ˈzapi]；con-TA-to [kõˈtatu]",
          bizNote: "在巴西做生意 95% 靠 WhatsApp 沟通，邮件回复率远低于 WhatsApp！"
        },
        {
          pt: "Aqui está o meu cartão. Meu nome é...",
          zh: "这是我的名片。我的名字叫……",
          guide: "a-QUI [aˈki]（qu 在 i 前读 k）；es-TÁ [isˈta]；car-TÃO [kahˈtɐ̃w̃]",
          bizNote: "递名片时顺便打开 WhatsApp 扫码，成交率翻倍。"
        }
      ]
    },
    {
      id: "whatsapp",
      label: "💬 WhatsApp 跟单高频",
      items: [
        {
          pt: "Bom dia, amigo! Tudo joia com você?",
          zh: "早上好朋友！你一切都棒吗？",
          guide: "a-MI-go [aˈmigu]；JOI-a [ˈʒɔj.ɐ]（j 读法语式浊擦音 [ʒ]）",
          bizNote: "Tudo joia? 是巴西人非常地道的友好问候，比干巴巴谈公事更讨喜。"
        },
        {
          pt: "Vou te mandar o catálogo e a tabela de preços agora.",
          zh: "我现在就把产品目录和价格表发给你。",
          guide: "ca-TÁ-lo-go [kaˈtalogu]；ta-BE-la [taˈbɛlɐ]；PRE-ços [ˈpɾesus]；a-GO-ra [aˈgɔɾɐ]",
          bizNote: "Vou + 动词原形 = 巴葡最地道、最简单的将来时（“我这就去……”）。"
        },
        {
          pt: "Qual quantidade você precisa para este pedido?",
          zh: "这笔订单您需要多少数量？",
          guide: "quan-ti-DA-de [kwɐ̃tʃiˈdadʒi]；pre-CI-sa [pɾeˈsizɐ]（元音间 s 读 z）",
          bizNote: "询问 MOQ 与采购量必用句。"
        },
        {
          pt: "Posso te ligar rapidinho pelo WhatsApp?",
          zh: "我能用 WhatsApp 给你打个简短语音电话吗？",
          guide: "ha-pi-DI-nho -> ra-pi-DI-nho [hapiˈdʒiɲu]（词首 r 读 h，小称词 -inho 显得很客气礼貌）",
          bizNote: "巴西人超爱用小称词（rapidinho 稍微快点儿 / um pouquinho 一点点），语气非常温和礼貌。"
        }
      ]
    },
    {
      id: "pricing",
      label: "💰 报价、议价与付款",
      items: [
        {
          pt: "Esse já é o nosso melhor preço FOB Xangai.",
          zh: "这已经是我们最好的上海离岸价（FOB）了。",
          guide: "me-LHOR [meˈʎɔh]（lh 舌面音）；PRE-ço [ˈpɾesu]；Xan-GAI [ʃɐ̃ˈgaj]（x 读 sh）",
          bizNote: "巴西海运费用高，报价务必说清 FOB 还是 CIF。"
        },
        {
          pt: "Se pedir mais, consigo fazer um desconto de cinco por cento.",
          zh: "如果订得更多，我能给您做 5% 的折扣。",
          guide: "con-SI-go [kõˈsigu]；des-CON-to [dʒisˈkõtu]；CIN-co por CEN-to [ˈsĩku poh ˈsẽtu]",
          bizNote: "consigo + 动词原形 = “我能为您争取到……”，谈判神器。"
        },
        {
          pt: "O nosso pedido mínimo é de mil peças.",
          zh: "我们的最小起订量（MOQ）是 1000 件。",
          guide: "MÍ-ni-mo [ˈminimu]；MIL [miw]（尾音 l 读乌！）；PE-ças [ˈpɛsɐs]",
          bizNote: "mil = 1000（注意 mil 前面不加 um）。"
        },
        {
          pt: "Trinta por cento de sinal e o saldo antes do embarque.",
          zh: "30% 定金，余款发货（装船）前付清。",
          guide: "si-NAL [siˈnaw]（定金，l 读 w）；SAL-do [ˈsawdu]（尾款/余额）；em-BAR-que [ẽˈbahki]",
          bizNote: "外贸 T/T 经典付款条件（30% 定金 + 70% 装船前）。"
        }
      ]
    },
    {
      id: "shipping",
      label: "🚢 样品、交期与清关",
      items: [
        {
          pt: "A amostra fica pronta na semana que vem.",
          zh: "样品下周就能准备好。",
          guide: "a-MOS-tra [aˈmɔstɾɐ]；PRON-ta [ˈpɾõtɐ]；se-MA-na que VEM [vẽj̃]",
          bizNote: "na semana que vem = 下周，口语使用率 100%。"
        },
        {
          pt: "O prazo de produção é de vinte dias úteis.",
          zh: "生产交期是 20 个工作日。",
          guide: "pro-du-ÇÃO [pɾoduˈsɐ̃w̃]；VIN-te [ˈvĩtʃi]；DI-as Ú-teis [ˈdʒiɐs ˈutejs]",
          bizNote: "dias úteis = 工作日（排除巴西节假日与周末，避免交期纠纷）。"
        },
        {
          pt: "Preciso do seu CNPJ para emitir a fatura proforma.",
          zh: "我需要您的巴西公司税号（CNPJ）来开具形式发票。",
          guide: "CNPJ 逐字母读作 [se ẽni pe ˈʒɔtɐ]；fa-TU-ra [faˈtuɾɐ]",
          bizNote: "做巴西外贸必懂：所有巴西正规进口公司提单和发票上都必须填写 CNPJ 企业税号！"
        }
      ]
    }
  ];

  // ─── 状态加载与持久化 ──────────────────────────────────────────────────────
  let coachState = {
    packId: "phonetics",
    itemIdx: 0,
    targetPt: BR_BIZ_PACKS[0].items[0].pt,
    targetZh: BR_BIZ_PACKS[0].items[0].zh,
    guideHint: BR_BIZ_PACKS[0].items[0].guide,
    bizNote: BR_BIZ_PACKS[0].items[0].bizNote,
    geminiApiKey: "",
    historyCount: 0,
    bestScores: {}
  };

  try {
    const raw = localStorage.getItem(COACH_STORAGE_KEY);
    if (raw) {
      coachState = Object.assign(coachState, JSON.parse(raw));
    }
  } catch (_) {}

  function saveCoachState() {
    try {
      localStorage.setItem(COACH_STORAGE_KEY, JSON.stringify(coachState));
    } catch (_) {}
  }

  // ─── 巴葡音节切分、重音识别与发音雷区自动提取引擎 (PT-BR Phonetics Engine) ──
  const VOWEL_CHARS = "aeiouáéíóúâêôãõüAEIOUÁÉÍÓÚÂÊÔÃÕÜ";
  const ACCENTED_CHARS = "áéíóúâêôãõÁÉÍÓÚÂÊÔÃÕ";

  function isVowel(ch) {
    return ch && VOWEL_CHARS.indexOf(ch) !== -1;
  }

  function hasAccentChar(str) {
    for (let i = 0; i < str.length; i++) {
      if (ACCENTED_CHARS.indexOf(str[i]) !== -1) return true;
    }
    return false;
  }

  function stripAccents(str) {
    return (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function tokenizeWords(text) {
    const matches = (text || "").match(/[A-Za-zÀ-ÖØ-öø-ÿ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿ]+)*/g);
    return matches || [];
  }

  // Approximate Portuguese syllabifier & stress highlighter for learner readability
  function syllabifyAndHighlightStress(word) {
    const clean = word.trim();
    if (clean.length <= 2) return clean.toUpperCase();

    // Split vowel/consonant clusters into readable Portuguese syllables
    const syllables = [];
    let cur = "";
    const lower = clean.toLowerCase();
    const inseparableClusters = /^(br|cr|dr|fr|gr|pr|tr|vr|bl|cl|fl|gl|pl|tl|ch|lh|nh|qu|gu)/;

    let i = 0;
    while (i < clean.length) {
      cur += clean[i];
      if (isVowel(clean[i])) {
        // Check diphthongs (ão, õe, ãe, ai, ei, oi, ui, au, eu, ou, ia, ie, io, ua, ue, uo)
        while (
          i + 1 < clean.length &&
          isVowel(clean[i + 1]) &&
          !/^(i[aeoáéó]|u[aeoáéó])$/i.test(clean.slice(i, i + 2))
        ) {
          // Keep true diphthongs together (ão, ei, oi, au, ou, ai, ui, õe, ãe, qu+V, gu+V)
          const pair = lower.slice(i, i + 2);
          const prevCh = i > 0 ? lower[i - 1] : "";
          if (
            (prevCh === "q" || prevCh === "g") && lower[i] === "u" ||
            /^(ão|õe|ãe|ai|ei|oi|ui|au|eu|ou)$/.test(pair)
          ) {
            i++;
            cur += clean[i];
          } else {
            break;
          }
        }

        // Look ahead at consonants before next vowel
        let cStart = i + 1;
        let cEnd = cStart;
        while (cEnd < clean.length && !isVowel(clean[cEnd])) {
          cEnd++;
        }
        const cons = lower.slice(cStart, cEnd);
        if (cEnd === clean.length) {
          // Trailing consonants stay with final syllable
          cur += clean.slice(cStart, cEnd);
          i = cEnd;
        } else if (cons.length === 0) {
          syllables.push(cur);
          cur = "";
          i++;
          continue;
        } else if (cons.length === 1) {
          syllables.push(cur);
          cur = "";
          i++;
          continue;
        } else if (cons.length === 2) {
          if (cons === "rr" || cons === "ss" || !inseparableClusters.test(cons)) {
            cur += clean[cStart];
            syllables.push(cur);
            cur = "";
            i = cStart + 1;
            continue;
          } else {
            syllables.push(cur);
            cur = "";
            i++;
            continue;
          }
        } else {
          // 3+ consonants: keep last 2 if inseparable cluster, else last 1
          const tail2 = cons.slice(-2);
          const splitAt = inseparableClusters.test(tail2) ? cEnd - 2 : cEnd - 1;
          cur += clean.slice(cStart, splitAt);
          syllables.push(cur);
          cur = "";
          i = splitAt;
          continue;
        }
      } else {
        i++;
      }
    }
    if (cur) syllables.push(cur);
    if (syllables.length === 1) return syllables[0].toUpperCase();

    // Determine stressed syllable index
    let stressIdx = -1;
    for (let s = syllables.length - 1; s >= 0; s--) {
      if (hasAccentChar(syllables[s])) {
        stressIdx = s;
        break;
      }
    }
    if (stressIdx === -1) {
      // Unaccented rule: ends in -a(s), -e(s), -o(s), -am, -em, -ens -> paroxytone (second-to-last)
      if (/(a|as|e|es|o|os|am|em|ens)$/i.test(lower)) {
        stressIdx = Math.max(0, syllables.length - 2);
      } else {
        stressIdx = syllables.length - 1;
      }
    }

    return syllables
      .map((syl, idx) => (idx === stressIdx ? `<strong class="stress-syl">${syl.toUpperCase()}</strong>` : syl.toLowerCase()))
      .join("·");
  }

  // Extract Brazilian Portuguese pronunciation checkpoints for any input text
  function analyzePtBrCheckpoints(text) {
    const words = tokenizeWords(text);
    const tips = [];
    const seen = new Set();

    const addTip = (key, badge, cls, detail) => {
      if (seen.has(key)) return;
      seen.add(key);
      tips.push({ badge, cls, detail });
    };

    words.forEach((w) => {
      const lw = w.toLowerCase();

      // 1. Nasal vowels & coda -m
      if (/[ãõ]|(ão|õe|ãe)/i.test(lw)) {
        addTip(
          "nasal_ao",
          `鼻元音 (${w})`,
          "nasal",
          `<strong>${w}</strong> 含强鼻音：口腔自然打开，软腭下垂让气流从鼻腔共鸣出声（别漏掉鼻韵尾读成纯口元音）。`
        );
      } else if (/(am|em|im|om|um|ens)$/i.test(lw)) {
        addTip(
          "coda_m",
          `词尾 -m 不闭唇 (${w})`,
          "nasal",
          `<strong>${w}</strong> 的词尾 <code>m</code> 只表示鼻化，<strong>千万不要像英语那样双唇闭合</strong>！嘴唇保持微张发鼻音。`
        );
      }

      // 2. Palatalization of ti / di / final -te / -de
      if (/(ti|di)/i.test(lw) || /(te|tes|de|des)$/i.test(lw)) {
        addTip(
          "palatal",
          `巴葡腭化 (${w})`,
          "palatal",
          `<strong>${w}</strong> 在巴西口音中发生腭化：<code>ti/-te</code> 读如<strong>“奇 [tʃi]”</strong>，<code>di/-de</code> 读如<strong>“吉 [dʒi]”</strong>。`
        );
      }

      // 3. Vocalization of coda/final -l -> [w]
      if (/l$/i.test(lw) || /[aeiouáéíóúâêô]l[bcdfghjkmnpqrstvwxz]/i.test(lw)) {
        addTip(
          "vocal_l",
          `L 读如“乌” (${w})`,
          "l-sound",
          `<strong>${w}</strong> 音节尾的 <code>l</code> 在巴葡里<strong>舌尖不顶上齿龈</strong>，直接圆唇读成半元音 <strong>[w]（乌）</strong>。`
        );
      }

      // 4. R / RR rules
      if (/^r/i.test(lw) || /rr/i.test(lw)) {
        addTip(
          "strong_r",
          `喉擦音 R (${w})`,
          "r-sound",
          `<strong>${w}</strong> 的词首 <code>r</code> 或双写 <code>rr</code> 在巴葡读<strong>喉擦音 [h]（像轻吐气的“喝/黑”）</strong>，不卷舌！`
        );
      } else if (/[aeiouáéíóúâêôãõ]r[aeiouáéíóúâêôãõ]/i.test(lw)) {
        addTip(
          "tap_r",
          `单闪音 r (${w})`,
          "r-sound",
          `<strong>${w}</strong> 两个元音间的单个 <code>r</code> 舌尖快速轻弹一下上齿龈 <strong>[ɾ]</strong>（近似极快的“啦/哩”）。`
        );
      }

      // 5. Digraphs ch, lh, nh & silent h
      if (/ch/i.test(lw)) {
        addTip(
          "digraph_ch",
          `ch 读“嘘” (${w})`,
          "digraph",
          `<strong>${w}</strong> 的 <code>ch</code> 永远读平缓的 <strong>[ʃ]（像英语 sh / 中文“希”）</strong>，绝不读翘舌“拆/吃”！`
        );
      }
      if (/lh/i.test(lw)) {
        addTip(
          "digraph_lh",
          `舌面音 lh (${w})`,
          "digraph",
          `<strong>${w}</strong> 的 <code>lh</code> 舌面贴硬腭读 <strong>[ʎ]</strong>（近似极快连读“利衣”）。`
        );
      }
      if (/nh/i.test(lw)) {
        addTip(
          "digraph_nh",
          `鼻舌面 nh (${w})`,
          "digraph",
          `<strong>${w}</strong> 的 <code>nh</code> 读 <strong>[ɲ]</strong>（近似极快连读“尼衣”）。`
        );
      }
      if (/^h/i.test(lw)) {
        addTip(
          "silent_h",
          `词首 h 不发音 (${w})`,
          "digraph",
          `<strong>${w}</strong> 词首的 <code>h</code> 完全静音，直接从后面的元音开始读！`
        );
      }
    });

    const syllableStrip = words.map((w) => `<span class="coach-syl-pill">${syllabifyAndHighlightStress(w)}</span>`).join(" ");
    return { syllableStrip, tips };
  }

  // ─── 文本对齐与发音错误归因评分算法 ──────────────────────────────────────────
  function editDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[m][n];
  }

  function evaluateTranscriptMatch(targetPt, alternatives) {
    const targetWords = tokenizeWords(targetPt);
    if (!targetWords.length) {
      return { score: 0, bestHeard: "", wordResults: [], specificAdvice: [] };
    }

    const candidates = (alternatives && alternatives.length ? alternatives : [""]).filter(Boolean);
    if (!candidates.length) {
      return {
        score: 0,
        bestHeard: "",
        wordResults: targetWords.map((w) => ({ word: w, status: "bad", matched: "" })),
        specificAdvice: ["未检测到清晰的葡语语音识别结果。请靠近麦克风、放慢语速再试一次，或点击下方「🧠 Gemini 原生听音精评」直接分析录音原声。"]
      };
    }

    // Pick candidate with highest similarity to target
    let bestScore = -1;
    let bestEval = null;

    candidates.forEach((candObj) => {
      const text = typeof candObj === "string" ? candObj : candObj.transcript || "";
      const conf = typeof candObj === "object" && candObj.confidence ? candObj.confidence : 0.88;
      const heardWords = tokenizeWords(text);
      const usedIdx = new Set();
      const wordResults = [];
      const specificAdvice = [];
      let totalWordPoints = 0;

      targetWords.forEach((tw) => {
        const twLower = tw.toLowerCase();
        const twBase = stripAccents(tw);

        let bestJ = -1;
        let bestSim = 0;
        let exactAccent = false;

        heardWords.forEach((hw, j) => {
          if (usedIdx.has(j)) return;
          const hwLower = hw.toLowerCase();
          const hwBase = stripAccents(hw);
          if (hwLower === twLower) {
            if (1.0 > bestSim) {
              bestSim = 1.0;
              bestJ = j;
              exactAccent = true;
            }
          } else if (hwBase === twBase) {
            if (0.92 > bestSim) {
              bestSim = 0.92;
              bestJ = j;
              exactAccent = false;
            }
          } else {
            const maxLen = Math.max(twBase.length, hwBase.length, 1);
            const dist = editDistance(twBase, hwBase);
            const sim = 1 - dist / maxLen;
            if (sim > bestSim) {
              bestSim = sim;
              bestJ = j;
              exactAccent = false;
            }
          }
        });

        if (bestJ !== -1 && bestSim >= 0.88) {
          usedIdx.add(bestJ);
          const matchedWord = heardWords[bestJ];
          if (exactAccent) {
            totalWordPoints += 1.0;
            wordResults.push({ word: tw, status: "good", matched: matchedWord });
          } else {
            totalWordPoints += 0.85;
            wordResults.push({ word: tw, status: "warn", matched: matchedWord });
            specificAdvice.push(`「${tw}」被听成了「${matchedWord}」：注意开闭口元音或鼻音符号的饱满度。`);
          }
        } else if (bestJ !== -1 && bestSim >= 0.5) {
          usedIdx.add(bestJ);
          const matchedWord = heardWords[bestJ];
          totalWordPoints += bestSim * 0.7;
          wordResults.push({ word: tw, status: "warn", matched: matchedWord });

          // Confusion-specific phonetic diagnosis!
          const mwLow = matchedWord.toLowerCase();
          if (/ão$/i.test(twLower) && /(au|ao|am)$/i.test(mwLow)) {
            specificAdvice.push(`⚠️ 鼻音预警：「${tw}」被听成了「${matchedWord}」，说明词尾 -ão 的鼻腔共鸣不够，气流别只走口腔！`);
          } else if (/rr/i.test(twLower) && !/rr/i.test(mwLow)) {
            specificAdvice.push(`⚠️ R 音预警：「${tw}」包含双 rr，需读喉擦音 [h]（如“喝”），不要读成单闪音「${matchedWord}」！`);
          } else if (!/rr/i.test(twLower) && /r/i.test(twLower) && /rr/i.test(mwLow)) {
            specificAdvice.push(`⚠️ 单颤音预警：「${tw}」是单 r（舌尖轻弹一下），用力过猛被听成了双 rr 的「${matchedWord}」！`);
          } else if (/l$/i.test(twLower)) {
            specificAdvice.push(`💡 尾音 -L 提示：读「${tw}」时词尾 l 不要卷舌，嘴唇圆起来读成 [w]（乌），否则容易被听偏为「${matchedWord}」。`);
          } else {
            specificAdvice.push(`🔍 「${tw}」听感接近「${matchedWord}」，建议点下方 🐢 0.7x 慢读听清重音位置：${syllabifyAndHighlightStress(tw).replace(/<[^>]+>/g, "")}。`);
          }
        } else {
          wordResults.push({ word: tw, status: "bad", matched: "" });
          specificAdvice.push(`🔴 漏读或偏差较大：「${tw}」未识别出，请重点跟读它的重音节奏（${syllabifyAndHighlightStress(tw).replace(/<[^>]+>/g, "")}）。`);
        }
      });

      const rawCoverage = totalWordPoints / targetWords.length;
      const confBonus = Math.min(1.0, Math.max(0.82, conf));
      const computed = Math.round(rawCoverage * 100 * (0.9 + 0.1 * confBonus));

      if (computed > bestScore) {
        bestScore = computed;
        bestEval = {
          score: Math.min(100, Math.max(0, computed)),
          bestHeard: text,
          wordResults,
          specificAdvice: specificAdvice.slice(0, 4)
        };
      }
    });

    return bestEval;
  }

  // ─── 注入样式 ──────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById("pronCoachStyles")) return;
    const style = document.createElement("style");
    style.id = "pronCoachStyles";
    style.textContent = `
      .coach-card {
        background: linear-gradient(145deg, #ffffff 0%, #f0fdf4 55%, #eff6ff 100%);
        border: 1.5px solid #6ee7b7;
        border-radius: 18px;
        padding: 16px;
        margin-bottom: 14px;
        box-shadow: 0 8px 26px -6px rgba(4, 120, 87, 0.14);
      }
      .coach-top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }
      .coach-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .coach-title {
        font-size: 16px;
        font-weight: 800;
        color: #064e3b;
        margin: 0;
      }
      .coach-agent-badge {
        font-size: 11px;
        font-weight: 700;
        background: linear-gradient(90deg, #059669, #2563eb);
        color: #fff;
        padding: 2px 8px;
        border-radius: 99px;
      }
      .coach-pack-tabs {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 6px;
        margin-bottom: 8px;
        scrollbar-width: none;
      }
      .coach-pack-tabs::-webkit-scrollbar { display: none; }
      .coach-pack-tab {
        border: 1px solid #cbd5e1;
        background: #fff;
        color: #334155;
        border-radius: 99px;
        padding: 5px 11px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .coach-pack-tab.active {
        background: #047857;
        color: #fff;
        border-color: #047857;
      }
      .coach-sentence-pills {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 8px;
        margin-bottom: 10px;
        scrollbar-width: none;
      }
      .coach-sentence-pills::-webkit-scrollbar { display: none; }
      .coach-sent-pill {
        border: 1px solid #bfdbfe;
        background: #eff6ff;
        color: #1e40af;
        border-radius: 9px;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
      }
      .coach-sent-pill.active {
        background: #1d4ed8;
        color: #fff;
        border-color: #1d4ed8;
      }
      .coach-stage-box {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 14px;
        padding: 13px 14px;
        margin-bottom: 10px;
      }
      .coach-target-input-row {
        display: flex;
        gap: 6px;
        margin-bottom: 6px;
      }
      .coach-target-input {
        flex: 1;
        font-size: 16.5px;
        font-weight: 800;
        color: #0f172a;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 8px 11px;
        background: #f8fafc;
        font-family: inherit;
      }
      .coach-target-input:focus {
        outline: none;
        border-color: #059669;
        background: #fff;
      }
      .coach-target-zh {
        font-size: 13px;
        color: #475569;
        margin-bottom: 8px;
      }
      .coach-syl-bar {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 8px;
        padding: 7px 9px;
        background: #f8fafc;
        border-radius: 9px;
        border: 1px dashed #cbd5e1;
        font-size: 13px;
      }
      .coach-syl-pill {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 2px 7px;
        color: #475569;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .stress-syl {
        color: #047857;
        font-weight: 900;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .coach-tips-strip {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 6px;
      }
      .coach-phon-tip {
        font-size: 12px;
        line-height: 1.45;
        padding: 6px 9px;
        border-radius: 8px;
        background: #fffbeb;
        border-left: 3px solid #f59e0b;
        color: #334155;
      }
      .coach-biz-tip {
        font-size: 12px;
        line-height: 1.45;
        padding: 6px 9px;
        border-radius: 8px;
        background: #eff6ff;
        border-left: 3px solid #2563eb;
        color: #1e3a8a;
        margin-top: 5px;
      }
      .coach-action-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin: 10px 0;
      }
      .coach-btn {
        border: 1px solid #cbd5e1;
        background: #fff;
        color: #0f172a;
        border-radius: 11px;
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.15s ease;
      }
      .coach-btn:hover:not(:disabled) {
        background: #f1f5f9;
      }
      .coach-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .coach-btn-rec {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        color: #fff;
        border: none;
        padding: 10px 18px;
        font-size: 14px;
        font-weight: 800;
        box-shadow: 0 4px 14px rgba(5, 150, 105, 0.32);
      }
      .coach-btn-rec.recording {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        animation: coachPulse 1.15s infinite;
      }
      @keyframes coachPulse {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.55); }
        70% { box-shadow: 0 0 0 11px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
      .coach-wave-wrap {
        display: none;
        align-items: center;
        gap: 10px;
        background: #0f172a;
        color: #f8fafc;
        padding: 8px 12px;
        border-radius: 11px;
        margin-bottom: 10px;
      }
      .coach-wave-wrap.active {
        display: flex;
      }
      .coach-wave-canvas {
        width: 150px;
        height: 32px;
        border-radius: 6px;
        background: #1e293b;
        flex-shrink: 0;
      }
      .coach-live-asr {
        font-size: 12.5px;
        color: #93c5fd;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .coach-result-panel {
        display: none;
        background: #ffffff;
        border: 1.5px solid #cbd5e1;
        border-radius: 14px;
        padding: 13px 14px;
        margin-top: 8px;
      }
      .coach-result-panel.visible {
        display: block;
      }
      .coach-score-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }
      .coach-score-circle {
        font-size: 22px;
        font-weight: 900;
        padding: 6px 14px;
        border-radius: 12px;
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
      }
      .coach-score-circle.high { background: #dcfce7; color: #166534; }
      .coach-score-circle.mid  { background: #fef3c7; color: #92400e; }
      .coach-score-circle.low  { background: #fee2e2; color: #991b1b; }
      .coach-word-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 8px 0;
      }
      .coach-w-chip {
        padding: 4px 10px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .coach-w-chip.good { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
      .coach-w-chip.warn { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
      .coach-w-chip.bad  { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
      .coach-acoustic-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        font-size: 12px;
        color: #475569;
        background: #f8fafc;
        padding: 7px 10px;
        border-radius: 9px;
        margin: 8px 0;
      }
      .coach-ai-box {
        margin-top: 10px;
        padding: 11px 12px;
        border-radius: 11px;
        background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
        border: 1px solid #c7d2fe;
        font-size: 13px;
        line-height: 1.55;
      }
      .mini-prac-btn {
        border: 1px solid #6ee7b7;
        background: #ecfdf5;
        color: #047857;
        border-radius: 7px;
        padding: 2px 7px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }
      .mini-prac-btn:hover {
        background: #047857;
        color: #fff;
      }
      .coach-key-modal {
        display: none;
        margin-top: 8px;
        padding: 10px 12px;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        font-size: 12.5px;
      }
      .coach-key-modal.open {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── 播放工具（支持 1.0x 标准、0.7x 神经网络无损慢速、AB 对比回放） ────────
  const coachAudio = new Audio();
  const slowTtsCache = new Map();
  let localServerOnline = null; // null: unknown, true: online, false: offline (e.g. GitHub Pages)

  async function playNativePtBr(text, slowMode = false) {
    const clean = (text || "").trim();
    if (!clean) return;
    const rateParam = slowMode ? "-32%" : "-5%";
    const cacheKey = `${rateParam}::${clean.toLowerCase()}`;

    if (slowTtsCache.has(cacheKey)) {
      coachAudio.src = slowTtsCache.get(cacheKey);
      coachAudio.playbackRate = 1.0;
      await playAudioElementPromise(coachAudio);
      return;
    }

    // Try local Edge-TTS server first when online or not yet probed
    if (localServerOnline !== false) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 2200);
        const url = `${LOCAL_API_BASE}/tts?text=${encodeURIComponent(clean)}&voice=pt-BR-FranciscaNeural&rate=${encodeURIComponent(rateParam)}`;
        const res = await fetch(url, { signal: ctrl.signal });
        clearTimeout(timer);
        if (res.ok) {
          localServerOnline = true;
          const blob = await res.blob();
          const objUrl = URL.createObjectURL(blob);
          slowTtsCache.set(cacheKey, objUrl);
          coachAudio.src = objUrl;
          coachAudio.playbackRate = 1.0;
          await playAudioElementPromise(coachAudio);
          return;
        }
      } catch (_) {
        if (localServerOnline === null) localServerOnline = false;
      }
    }

    // Fallback to app's main speakPortuguese or WebSpeech
    if (!slowMode && typeof window.PT_APP_SPEAK === "function") {
      await window.PT_APP_SPEAK(clean, { lang: "pt-BR" });
      return;
    }

    if ("speechSynthesis" in window) {
      await new Promise((resolve) => {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(clean);
        u.lang = "pt-BR";
        u.rate = slowMode ? 0.68 : 0.95;
        const voices = window.speechSynthesis.getVoices() || [];
        const brV = voices.find((v) => /pt[-_]br/i.test(v.lang));
        if (brV) u.voice = brV;
        u.onend = resolve;
        u.onerror = resolve;
        window.speechSynthesis.speak(u);
      });
    }
  }

  function playAudioElementPromise(audioEl) {
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      audioEl.onended = finish;
      audioEl.onerror = finish;
      audioEl.play().catch(finish);
    });
  }

  // ─── 主组件挂载与交互逻辑 ──────────────────────────────────────────────────
  let lastRecordingBlob = null;
  let lastRecordingUrl = "";
  let lastRecordingBase64 = "";
  let lastRecordingMime = "audio/webm";
  let isRecording = false;
  let mediaRecorder = null;
  let activeStream = null;
  let speechRec = null;
  let animFrameId = null;
  let audioCtx = null;
  let serverHasGeminiKey = false;

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result || "");
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function mountCoachCard() {
    injectStyles();
    const studyContainer = document.getElementById("studyViewContainer");
    const dramaBar = document.getElementById("dramaBar");
    if (!studyContainer || document.getElementById("pronCoachCard")) return;

    const card = document.createElement("section");
    card.className = "coach-card";
    card.id = "pronCoachCard";
    card.innerHTML = `
      <div class="coach-top-row">
        <div class="coach-title-wrap">
          <h2 class="coach-title">🎙️ 巴西生意口语 · 发音纠音私教 Agent</h2>
          <span class="coach-agent-badge">🇧🇷 巴葡专训 · 支持真耳听音</span>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <span id="coachServerBadge" style="font-size:11.5px;color:#047857;font-weight:600;">⚡ 检测本地语音服务…</span>
          <button class="small-action-btn" id="coachKeyToggleBtn" title="配置可选的 Gemini 原生音频 API Key">⚙️ AI 听音设置</button>
        </div>
      </div>

      <div class="coach-key-modal" id="coachKeyModal">
        <div style="font-weight:700;margin-bottom:4px;color:#0f172a;">🧠 Gemini 原生音频“真耳听音”配置（可选）</div>
        <div style="color:#475569;margin-bottom:6px;line-height:1.5;">
          • <strong>免 Key 模式（默认可用）</strong>：直接用浏览器巴葡语音识别 + 音素雷区引擎 + 声学节奏对比；且每次录音会自动存到 <code>audio/my_recordings/latest.wav</code>，你可以随时在 <strong>Antigravity 聊天框</strong>对我说<strong>“帮我听下刚才那句发音”</strong>，我直接免费读取原声帮你逐字纠音！<br/>
          • <strong>网页直连 AI 听音</strong>：填入你的 Gemini API Key（仅保存在本机浏览器），即可在手机/网页上一键呼叫大模型直听录音。
        </div>
        <div style="display:flex;gap:6px;">
          <input type="password" id="coachGeminiKeyInput" placeholder="粘贴 Gemini API Key (AIzaSy...)" style="flex:1;padding:6px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:12.5px;" />
          <button class="coach-btn" id="coachSaveKeyBtn" style="padding:5px 12px;font-size:12px;">保存</button>
        </div>
      </div>

      <!-- 5大巴西外贸场景分类切换 -->
      <div class="coach-pack-tabs" id="coachPackTabs"></div>
      <div class="coach-sentence-pills" id="coachSentencePills"></div>

      <!-- 当前训练目标句与音节/雷区实时拆解 -->
      <div class="coach-stage-box">
        <div class="coach-target-input-row">
          <input type="text" class="coach-target-input" id="coachTargetInput" placeholder="输入任意你想练的巴葡句子或单词，或点击下方课文里的 🎙️ 按钮…" />
        </div>
        <div class="coach-target-zh" id="coachTargetZh"></div>

        <div class="coach-syl-bar" id="coachSylBar" title="大写加粗下划线音节为重读音节 (Sílaba tônica)"></div>
        <div id="coachManualGuide" class="coach-phon-tip" style="display:none;background:#ecfdf5;border-left-color:#059669;"></div>
        <div class="coach-tips-strip" id="coachAutoTips"></div>
        <div id="coachBizTip" class="coach-biz-tip" style="display:none;"></div>
      </div>

      <!-- 示范播放 + 录音控制栏 -->
      <div class="coach-action-bar">
        <button class="coach-btn coach-btn-rec" id="coachRecordBtn">🎙️ 点击开始跟读录音</button>
        <button class="coach-btn" id="coachPlayStdBtn">🇧🇷 听巴葡标准音</button>
        <button class="coach-btn" id="coachPlaySlowBtn">🐢 0.7x 慢速拆解</button>
        <button class="coach-btn" id="coachPlayMineBtn" disabled>🧑 听我的录音</button>
        <button class="coach-btn" id="coachCompareAbBtn" disabled title="先放一遍标准巴葡，紧接着放一遍你刚才的录音，直观对比语调与鼻音差异">🔁 标准 vs 我 连播对比</button>
      </div>

      <!-- 录音时实时声波与听写字幕 -->
      <div class="coach-wave-wrap" id="coachWaveWrap">
        <canvas class="coach-wave-canvas" id="coachWaveCanvas" width="150" height="32"></canvas>
        <div class="coach-live-asr" id="coachLiveAsr">🎙️ 请用自然饱满的巴西口音朗读上方句子，读完再次点击红色按钮结束…</div>
      </div>

      <!-- 评测结果面板 -->
      <div class="coach-result-panel" id="coachResultPanel">
        <div class="coach-score-header">
          <div>
            <span class="coach-score-circle high" id="coachScoreBadge">92 <small style="font-size:12px;font-weight:700;">分</small></span>
            <span id="coachScoreSummary" style="font-size:13.5px;font-weight:700;color:#0f172a;margin-left:8px;"></span>
          </div>
          <button class="coach-btn" id="coachDeepAiBtn" style="background:#eef2ff;border-color:#a5b4fc;color:#3730a3;font-size:12px;padding:6px 11px;">
            🧠 Gemini 原生听音精评
          </button>
        </div>

        <div style="font-size:12.5px;color:#475569;margin-bottom:4px;" id="coachHeardRow"></div>
        <div style="font-size:11.5px;color:#64748b;margin-bottom:4px;">👇 点击任意颜色单词可单独听它的 <strong>🐢 慢速巴葡标准音</strong> 强化纠音：</div>
        <div class="coach-word-chips" id="coachWordChips"></div>
        <div class="coach-acoustic-row" id="coachAcousticRow" style="display:none;"></div>
        <div class="coach-tips-strip" id="coachEvalAdvice"></div>
        <div id="coachSavedFileHint" style="font-size:11.5px;color:#047857;margin-top:8px;"></div>
        <div id="coachAiDeepBox" class="coach-ai-box" style="display:none;"></div>
      </div>
    `;

    if (dramaBar && dramaBar.nextSibling) {
      studyContainer.insertBefore(card, dramaBar.nextSibling);
    } else {
      studyContainer.prepend(card);
    }

    // Add quick jump button in Unit Hero Bar
    const heroActions = document.querySelector(".hero-actions");
    if (heroActions && !document.getElementById("jumpPronCoachBtn")) {
      const jumpBtn = document.createElement("button");
      jumpBtn.className = "hero-btn";
      jumpBtn.id = "jumpPronCoachBtn";
      jumpBtn.style.cssText = "background:#fef3c7;color:#92400e;font-weight:800;border-color:#fde68a;";
      jumpBtn.textContent = "🎙️ 发音私教评测";
      jumpBtn.addEventListener("click", () => {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      heroActions.prepend(jumpBtn);
    }

    bindCoachEvents();
    renderPacksAndTarget();
    checkServerStatus();
    decorateExistingPageItems();
  }

  async function checkServerStatus() {
    const badge = document.getElementById("coachServerBadge");
    if (!badge) return;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 1500);
      const res = await fetch(`${LOCAL_API_BASE}/api/coach_status`, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        localServerOnline = true;
        const data = await res.json();
        serverHasGeminiKey = !!data.hasServerGeminiKey;
        badge.textContent = data.ffmpeg
          ? "🟢 本地声学评测 & 录音归档已就绪"
          : "🟢 本地语音服务在线";
        badge.style.color = "#047857";
        return;
      }
    } catch (_) {}
    localServerOnline = false;
    badge.textContent = "🌐 云端/浏览器评测模式";
    badge.style.color = "#64748b";
  }

  function renderPacksAndTarget() {
    const tabsEl = document.getElementById("coachPackTabs");
    const pillsEl = document.getElementById("coachSentencePills");
    const inputEl = document.getElementById("coachTargetInput");
    const zhEl = document.getElementById("coachTargetZh");
    const manualGuideEl = document.getElementById("coachManualGuide");
    const bizTipEl = document.getElementById("coachBizTip");

    if (!tabsEl) return;

    tabsEl.innerHTML = "";
    BR_BIZ_PACKS.forEach((pack) => {
      const btn = document.createElement("button");
      btn.className = "coach-pack-tab" + (pack.id === coachState.packId ? " active" : "");
      btn.textContent = pack.label;
      btn.addEventListener("click", () => {
        coachState.packId = pack.id;
        coachState.itemIdx = 0;
        const first = pack.items[0];
        loadTargetIntoCoach(first.pt, first.zh, first.guide, first.bizNote, false);
      });
      tabsEl.appendChild(btn);
    });

    const activePack = BR_BIZ_PACKS.find((p) => p.id === coachState.packId) || BR_BIZ_PACKS[0];
    pillsEl.innerHTML = "";
    activePack.items.forEach((item, idx) => {
      const pill = document.createElement("button");
      const isSelected = coachState.targetPt === item.pt;
      const best = coachState.bestScores[item.pt];
      pill.className = "coach-sent-pill" + (isSelected ? " active" : "");
      const shortLabel = item.pt.length > 26 ? item.pt.slice(0, 25) + "…" : item.pt;
      pill.textContent = best ? `${shortLabel} (${best}分)` : shortLabel;
      pill.addEventListener("click", () => {
        coachState.itemIdx = idx;
        loadTargetIntoCoach(item.pt, item.zh, item.guide, item.bizNote, false);
      });
      pillsEl.appendChild(pill);
    });

    inputEl.value = coachState.targetPt;
    zhEl.textContent = coachState.targetZh ? `中文释义：${coachState.targetZh}` : "自定义句子（已自动启用巴葡音节重音与发音雷区拆解）";

    if (coachState.guideHint) {
      manualGuideEl.style.display = "block";
      manualGuideEl.innerHTML = `🎯 <strong>本句口型要领</strong>：${coachState.guideHint}`;
    } else {
      manualGuideEl.style.display = "none";
    }

    if (coachState.bizNote) {
      bizTipEl.style.display = "block";
      bizTipEl.innerHTML = `💼 <strong>巴西生意实战锦囊</strong>：${coachState.bizNote}`;
    } else {
      bizTipEl.style.display = "none";
    }

    refreshPhoneticBreakdown(coachState.targetPt);
    saveCoachState();
  }

  function refreshPhoneticBreakdown(text) {
    const sylBar = document.getElementById("coachSylBar");
    const autoTips = document.getElementById("coachAutoTips");
    if (!sylBar || !autoTips) return;

    const { syllableStrip, tips } = analyzePtBrCheckpoints(text);
    if (syllableStrip) {
      sylBar.style.display = "flex";
      sylBar.innerHTML = `<span style="font-size:11.5px;font-weight:700;color:#047857;">🧭 重音音节拆解：</span> ${syllableStrip}`;
    } else {
      sylBar.style.display = "none";
    }

    autoTips.innerHTML = tips
      .slice(0, 4)
      .map((t) => `<div class="coach-phon-tip">🔍 ${t.detail}</div>`)
      .join("");
  }

  function loadTargetIntoCoach(ptText, zhText = "", guideHint = "", bizNote = "", scrollToCoach = true) {
    coachState.targetPt = (ptText || "").trim();
    coachState.targetZh = (zhText || "").trim();
    coachState.guideHint = guideHint || "";
    coachState.bizNote = bizNote || "";
    const resultPanel = document.getElementById("coachResultPanel");
    if (resultPanel) resultPanel.classList.remove("visible");
    renderPacksAndTarget();

    if (scrollToCoach) {
      const card = document.getElementById("pronCoachCard");
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Expose globally so any part of the app can send text to the coach
  window.LOAD_INTO_PRON_COACH = loadTargetIntoCoach;

  // ─── 录音与实时评测核心流程 ──────────────────────────────────────────────────
  function drawLiveWaveform(analyser) {
    const canvas = document.getElementById("coachWaveCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const bufLen = analyser.frequencyBinCount;
    const dataArr = new Uint8Array(bufLen);

    function render() {
      if (!isRecording) return;
      animFrameId = requestAnimationFrame(render);
      analyser.getByteTimeDomainData(dataArr);
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#34d399";
      ctx.beginPath();
      const sliceWidth = canvas.width / bufLen;
      let x = 0;
      for (let i = 0; i < bufLen; i++) {
        const v = dataArr[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }
    render();
  }

  async function startRecordingSession() {
    const recBtn = document.getElementById("coachRecordBtn");
    const waveWrap = document.getElementById("coachWaveWrap");
    const liveAsrEl = document.getElementById("coachLiveAsr");
    const resultPanel = document.getElementById("coachResultPanel");

    // Stop any playing audio first
    coachAudio.pause();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("当前浏览器环境不支持麦克风录音，请使用 Chrome、Edge 或 Safari 访问 http://127.0.0.1:8765/index.html。");
      return;
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
    } catch (err) {
      alert("无法获取麦克风权限，请在浏览器地址栏允许麦克风访问后重试！\n错误：" + err.message);
      return;
    }

    activeStream = stream;
    isRecording = true;
    if (resultPanel) resultPanel.classList.remove("visible");

    recBtn.classList.add("recording");
    recBtn.textContent = "⏹ 读完点击停止并评测";
    waveWrap.classList.add("active");
    liveAsrEl.textContent = "🎙️ 正在聆听（巴葡 pt-BR）… 请大声读出上方句子";

    // Waveform visualizer
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      drawLiveWaveform(analyser);
    } catch (_) {}

    // Collect ASR alternatives via Web Speech API (pt-BR)
    const asrAlternatives = [];
    let interimTranscript = "";
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      try {
        speechRec = new SR();
        speechRec.lang = "pt-BR";
        speechRec.continuous = true;
        speechRec.interimResults = true;
        speechRec.maxAlternatives = 5;

        speechRec.onresult = (ev) => {
          let finalParts = [];
          let interimParts = [];
          const altBuckets = [[], [], [], [], []];

          for (let i = 0; i < ev.results.length; i++) {
            const res = ev.results[i];
            if (res.isFinal) {
              finalParts.push(res[0].transcript);
              for (let a = 0; a < Math.min(5, res.length); a++) {
                altBuckets[a].push(res[a].transcript);
              }
            } else {
              interimParts.push(res[0].transcript);
            }
          }

          interimTranscript = (finalParts.join(" ") + " " + interimParts.join(" ")).trim();
          if (interimTranscript) {
            liveAsrEl.textContent = `👂 实时听写: "${interimTranscript}"`;
          }

          asrAlternatives.length = 0;
          altBuckets.forEach((parts, idx) => {
            const joined = parts.join(" ").trim();
            if (joined) {
              asrAlternatives.push({ transcript: joined, confidence: idx === 0 ? 0.92 : 0.84 });
            }
          });
        };
        speechRec.onerror = () => {};
        speechRec.start();
      } catch (_) {
        speechRec = null;
      }
    }

    // MediaRecorder for authentic user voice capture
    const chunks = [];
    let mimeType = "audio/webm";
    if (window.MediaRecorder) {
      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      }
      mediaRecorder = new MediaRecorder(stream, { mimeType });
      lastRecordingMime = mimeType;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        // Wait briefly for final SpeechRecognition event
        await new Promise((r) => setTimeout(r, 320));
        if (speechRec) {
          try { speechRec.stop(); } catch (_) {}
          speechRec = null;
        }

        if (!asrAlternatives.length && interimTranscript) {
          asrAlternatives.push({ transcript: interimTranscript, confidence: 0.85 });
        }

        const blob = new Blob(chunks, { type: mimeType });
        lastRecordingBlob = blob;
        if (lastRecordingUrl) URL.revokeObjectURL(lastRecordingUrl);
        lastRecordingUrl = URL.createObjectURL(blob);
        lastRecordingBase64 = await blobToBase64(blob);

        document.getElementById("coachPlayMineBtn").disabled = false;
        document.getElementById("coachCompareAbBtn").disabled = false;

        await finalizeEvaluation(asrAlternatives);
      };
      mediaRecorder.start();
    }
  }

  function stopRecordingSession() {
    if (!isRecording) return;
    isRecording = false;

    const recBtn = document.getElementById("coachRecordBtn");
    const waveWrap = document.getElementById("coachWaveWrap");
    recBtn.classList.remove("recording");
    recBtn.textContent = "🎙️ 重新跟读录音";
    waveWrap.classList.remove("active");

    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    if (activeStream) {
      activeStream.getTracks().forEach((t) => t.stop());
      activeStream = null;
    }
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  async function finalizeEvaluation(asrAlternatives) {
    const targetPt = coachState.targetPt;
    const targetZh = coachState.targetZh;
    const evalRes = evaluateTranscriptMatch(targetPt, asrAlternatives);

    // Upload recording to local server for WAV conversion + acoustic rhythm comparison
    let serverMeta = null;
    if (localServerOnline !== false) {
      try {
        const res = await fetch(`${LOCAL_API_BASE}/api/save_recording`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetText: targetPt,
            targetZh: targetZh,
            asrTranscript: evalRes.bestHeard,
            audioBase64: lastRecordingBase64,
            mimeType: lastRecordingMime
          })
        });
        if (res.ok) {
          const json = await res.json();
          serverMeta = json.meta;
        }
      } catch (_) {}
    }

    // Blend ASR accuracy + acoustic rhythm score when available
    let finalScore = evalRes.score;
    const acoustic = serverMeta && serverMeta.acoustic;
    if (acoustic && acoustic.rhythmScore !== null && finalScore > 0) {
      finalScore = Math.round(finalScore * 0.82 + acoustic.rhythmScore * 0.18);
    }

    // If browser doesn't support SpeechRecognition (e.g. restricted WebView), check if audio had energy
    const hasSR = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!hasSR && acoustic && acoustic.user && acoustic.user.trimmedDuration > 0.25) {
      finalScore = acoustic.rhythmScore || 75;
    }

    if (finalScore > (coachState.bestScores[targetPt] || 0)) {
      coachState.bestScores[targetPt] = finalScore;
      saveCoachState();
      renderPacksAndTarget();
    }

    renderEvaluationUI(finalScore, evalRes, serverMeta, hasSR);
  }

  function renderEvaluationUI(score, evalRes, serverMeta, hasSR) {
    const panel = document.getElementById("coachResultPanel");
    const badge = document.getElementById("coachScoreBadge");
    const summary = document.getElementById("coachScoreSummary");
    const heardRow = document.getElementById("coachHeardRow");
    const chipsEl = document.getElementById("coachWordChips");
    const acousticEl = document.getElementById("coachAcousticRow");
    const adviceEl = document.getElementById("coachEvalAdvice");
    const savedHintEl = document.getElementById("coachSavedFileHint");
    const aiDeepBox = document.getElementById("coachAiDeepBox");

    panel.classList.add("visible");
    aiDeepBox.style.display = "none";

    const tier = score >= 85 ? "high" : score >= 60 ? "mid" : "low";
    badge.className = `coach-score-circle ${tier}`;
    badge.innerHTML = `${score} <small style="font-size:12px;font-weight:700;">分</small>`;

    if (!hasSR) {
      summary.textContent = "已捕获原声并完成声学节奏分析（点击右侧按钮可启动 AI 原生听音）";
    } else if (score >= 88) {
      summary.textContent = "🎉 非常地道！巴西人完全能一秒听懂你的意思！";
    } else if (score >= 68) {
      summary.textContent = "👍 大体清晰！微调下面标黄/标红的词会更像巴西本地人";
    } else if (score > 0) {
      summary.textContent = "💪 刚开始很正常！先点「🐢 0.7x 慢速拆解」跟着节奏再来一遍";
    } else {
      summary.textContent = "🎤 没听清内容，请靠近麦克风大声朗读，或用右侧 AI 原生听音诊断";
    }

    if (evalRes.bestHeard) {
      heardRow.innerHTML = `👂 <strong>巴西耳朵听写结果</strong>：<code>"${evalRes.bestHeard}"</code>`;
    } else if (!hasSR) {
      heardRow.innerHTML = `👂 当前浏览器未开启实时听写，已启用<strong>声学波形对比 + 录音落盘模式</strong>`;
    } else {
      heardRow.innerHTML = `👂 <strong>巴西耳朵听写结果</strong>：<span style="color:#dc2626;">（未识别到清晰的葡语词句）</span>`;
    }

    chipsEl.innerHTML = "";
    evalRes.wordResults.forEach((wr) => {
      const chip = document.createElement("button");
      chip.className = `coach-w-chip ${wr.status}`;
      const icon = wr.status === "good" ? "✓" : wr.status === "warn" ? "≈" : "✕";
      chip.innerHTML = `<span>${icon} ${wr.word}</span><span style="font-size:11px;opacity:0.75;">🐢</span>`;
      chip.title = `点击慢速精听单词 "${wr.word}"`;
      chip.addEventListener("click", () => playNativePtBr(wr.word, true));
      chipsEl.appendChild(chip);
    });

    // Acoustic rhythm & volume feedback
    const acoustic = serverMeta && serverMeta.acoustic;
    if (acoustic && acoustic.user) {
      acousticEl.style.display = "flex";
      const uDur = acoustic.user.trimmedDuration;
      const rDur = acoustic.ref ? acoustic.ref.trimmedDuration : null;
      const pace = acoustic.paceRatio;
      let paceComment = "语速适中";
      if (pace > 1.35) paceComment = "语速偏慢（初学很稳，熟练后可连读）";
      else if (pace < 0.72) paceComment = "语速偏快（注意元音发饱满，巴葡不吞音）";
      const volWarn = acoustic.user.rmsDb < -36 ? " · ⚠️ 麦克风音量偏轻" : "";
      acousticEl.innerHTML = `
        <span>⏱ 你的发声时长: <strong>${uDur}s</strong></span>
        ${rDur ? `<span>🇧🇷 标准参考时长: <strong>${rDur}s</strong> (${paceComment})</span>` : ""}
        ${acoustic.rhythmScore !== null ? `<span>🎵 语流节奏吻合度: <strong>${acoustic.rhythmScore}%</strong>${volWarn}</span>` : ""}
      `;
    } else {
      acousticEl.style.display = "none";
    }

    adviceEl.innerHTML = (evalRes.specificAdvice || [])
      .map((adv) => `<div class="coach-phon-tip">${adv}</div>`)
      .join("");

    if (serverMeta && serverMeta.latestWav) {
      savedHintEl.innerHTML = `✅ 你的真实录音已自动保存至 <code>${serverMeta.latestWav}</code> —— 随时可在 <strong>Antigravity 对话框</strong>说一句<strong>“帮我听下刚才那句发音”</strong>让我亲耳为你深度纠音！`;
    } else {
      savedHintEl.innerHTML = "";
    }
  }

  // ─── Gemini 多模态原生音频“真耳听音”评测 ───────────────────────────────────
  async function runGeminiNativeAudioDiagnosis() {
    const aiBox = document.getElementById("coachAiDeepBox");
    const btn = document.getElementById("coachDeepAiBtn");
    if (!lastRecordingBase64) {
      alert("请先点击绿色按钮录一段你的跟读语音！");
      return;
    }

    const userKey = (coachState.geminiApiKey || "").trim();
    if (!userKey && !serverHasGeminiKey) {
      document.getElementById("coachKeyModal").classList.add("open");
      aiBox.style.display = "block";
      aiBox.innerHTML = `💡 <strong>两种方式使用 AI 真耳听音</strong>：<br/>
        1️⃣ <strong>完全免费免配置</strong>：录音已保存在本地 <code>audio/my_recordings/latest.wav</code>，直接切回 <strong>Antigravity 聊天窗口</strong>发一句：<code>帮我听下刚才那句发音</code>，我直接用多模态耳朵听录音给你纠音！<br/>
        2️⃣ <strong>网页端一键直连</strong>：在上方设置框填入你的 Gemini API Key 后再次点击本按钮。`;
      return;
    }

    btn.disabled = true;
    btn.textContent = "🧠 正在用 AI 耳朵精听原声…";
    aiBox.style.display = "block";
    aiBox.innerHTML = "🎧 正在上传原始声波，分析鼻元音共鸣、腭化音、重音与巴葡语调……";

    try {
      let assessment = null;

      // Try local server proxy first
      try {
        const res = await fetch(`${LOCAL_API_BASE}/api/gemini_assess`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: userKey,
            targetText: coachState.targetPt,
            targetZh: coachState.targetZh
          })
        });
        const data = await res.json();
        if (res.ok && data.assessment) {
          assessment = data.assessment;
        } else if (!userKey && data.error) {
          throw new Error(data.error);
        }
      } catch (srvErr) {
        if (!userKey) throw srvErr;
      }

      // Direct browser-to-Gemini call fallback (works on static GitHub Pages too!)
      if (!assessment && userKey) {
        const rawB64 = lastRecordingBase64.includes(",") ? lastRecordingBase64.split(",")[1] : lastRecordingBase64;
        const cleanMime = lastRecordingMime.split(";")[0] || "audio/webm";
        const promptText = `你是一位辅导中国外贸人学习【巴西葡萄牙语 (PT-BR)】的语音学私教。学员正在跟读目标句："${coachState.targetPt}"（${coachState.targetZh}）。请仔细听音频里的鼻元音(-ão/-m)、t/d腭化、r/rr发音、词尾-l圆唇度与重音，严格返回 JSON：{"overallScore":整数,"heardTranscript":"听到的葡语","summary":"总体评价","wordFeedback":[{"word":"词","status":"good|warn|bad","issue":"具体听感与口型建议"}],"phoneticTips":["核心建议"],"businessTip":"巴西商务贴士"}`;

        const gRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(userKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }, { inline_data: { mime_type: cleanMime, data: rawB64 } }] }],
              generationConfig: { temperature: 0.25, responseMimeType: "application/json" }
            })
          }
        );
        const gData = await gRes.json();
        if (!gRes.ok) {
          throw new Error(gData.error?.message || `HTTP ${gRes.status}`);
        }
        const txt = (gData.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
        assessment = JSON.parse(txt);
      }

      const wfHtml = (assessment.wordFeedback || [])
        .map((w) => {
          const icon = w.status === "good" ? "🟢" : w.status === "warn" ? "🟡" : "🔴";
          return `<div style="margin-bottom:4px;">${icon} <strong>${w.word}</strong>：${w.issue}</div>`;
        })
        .join("");

      const tipsHtml = (assessment.phoneticTips || []).map((t) => `<li>${t}</li>`).join("");

      aiBox.innerHTML = `
        <div style="font-weight:800;color:#312e81;margin-bottom:6px;">
          🧠 Gemini 原生听音私教报告 · 综合得分：${assessment.overallScore ?? "-"} 分
        </div>
        <div style="margin-bottom:6px;"><strong>👂 AI 实际听感</strong>：<code>"${assessment.heardTranscript || ""}"</code></div>
        <div style="margin-bottom:8px;"><strong>💬 总体点评</strong>：${assessment.summary || ""}</div>
        ${wfHtml ? `<div style="background:#fff;padding:8px 10px;border-radius:8px;margin-bottom:8px;">${wfHtml}</div>` : ""}
        ${tipsHtml ? `<ul style="margin:4px 0 6px;padding-left:18px;">${tipsHtml}</ul>` : ""}
        ${assessment.businessTip ? `<div style="color:#1e40af;font-size:12px;">💼 ${assessment.businessTip}</div>` : ""}
      `;
    } catch (err) {
      aiBox.innerHTML = `<span style="color:#dc2626;">⚠️ AI 听音调用未成功：${err.message}</span>`;
    } finally {
      btn.disabled = false;
      btn.textContent = "🧠 Gemini 原生听音精评";
    }
  }

  function bindCoachEvents() {
    const inputEl = document.getElementById("coachTargetInput");
    const recBtn = document.getElementById("coachRecordBtn");
    const playStdBtn = document.getElementById("coachPlayStdBtn");
    const playSlowBtn = document.getElementById("coachPlaySlowBtn");
    const playMineBtn = document.getElementById("coachPlayMineBtn");
    const compareAbBtn = document.getElementById("coachCompareAbBtn");
    const deepAiBtn = document.getElementById("coachDeepAiBtn");
    const keyToggleBtn = document.getElementById("coachKeyToggleBtn");
    const keyModal = document.getElementById("coachKeyModal");
    const keyInput = document.getElementById("coachGeminiKeyInput");
    const saveKeyBtn = document.getElementById("coachSaveKeyBtn");

    keyInput.value = coachState.geminiApiKey || "";

    keyToggleBtn.addEventListener("click", () => {
      keyModal.classList.toggle("open");
    });

    saveKeyBtn.addEventListener("click", () => {
      coachState.geminiApiKey = keyInput.value.trim();
      saveCoachState();
      keyModal.classList.remove("open");
    });

    inputEl.addEventListener("input", () => {
      coachState.targetPt = inputEl.value;
      coachState.targetZh = "";
      coachState.guideHint = "";
      coachState.bizNote = "";
      document.getElementById("coachTargetZh").textContent = "自定义句子（已自动启用巴葡音节重音与发音雷区拆解）";
      document.getElementById("coachManualGuide").style.display = "none";
      document.getElementById("coachBizTip").style.display = "none";
      refreshPhoneticBreakdown(coachState.targetPt);
      saveCoachState();
    });

    recBtn.addEventListener("click", () => {
      if (isRecording) stopRecordingSession();
      else startRecordingSession();
    });

    playStdBtn.addEventListener("click", () => playNativePtBr(coachState.targetPt, false));
    playSlowBtn.addEventListener("click", () => playNativePtBr(coachState.targetPt, true));

    playMineBtn.addEventListener("click", () => {
      if (!lastRecordingUrl) return;
      coachAudio.src = lastRecordingUrl;
      coachAudio.playbackRate = 1.0;
      coachAudio.play().catch(() => {});
    });

    compareAbBtn.addEventListener("click", async () => {
      if (!lastRecordingUrl) return;
      compareAbBtn.disabled = true;
      compareAbBtn.textContent = "🔊 1/2 正在播巴葡标准…";
      await playNativePtBr(coachState.targetPt, false);
      await new Promise((r) => setTimeout(r, 300));
      compareAbBtn.textContent = "🧑 2/2 正在播你的录音…";
      coachAudio.src = lastRecordingUrl;
      coachAudio.playbackRate = 1.0;
      await playAudioElementPromise(coachAudio);
      compareAbBtn.textContent = "🔁 标准 vs 我 连播对比";
      compareAbBtn.disabled = false;
    });

    deepAiBtn.addEventListener("click", runGeminiNativeAudioDiagnosis);
  }

  // ─── 自动给全站课文对话、巴剧台词、词汇表加上「🎙️ 练发音」快捷按钮 ────────────
  function decorateExistingPageItems() {
    // 1. Dialogue lines
    document.querySelectorAll("#dialoguesList .dialogue-line").forEach((lineEl) => {
      if (lineEl.dataset.coachDecorated) return;
      lineEl.dataset.coachDecorated = "1";
      const btnGroup = lineEl.querySelector(".mini-accent-btns");
      const ptEl = lineEl.querySelector(".pt-sentence");
      const zhEl = lineEl.querySelector(".zh-sentence");
      if (btnGroup && ptEl) {
        const btn = document.createElement("button");
        btn.className = "mini-prac-btn";
        btn.title = "把这句送入巴葡发音私教台跟读评测";
        btn.textContent = "🎙️ 评测";
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          loadTargetIntoCoach(ptEl.textContent, zhEl ? zhEl.textContent : "");
        });
        btnGroup.appendChild(btn);
      }
    });

    // 2. Brazilian TV clips
    document.querySelectorAll("#brTvClipsList .diff-item").forEach((clipEl) => {
      if (clipEl.dataset.coachDecorated) return;
      clipEl.dataset.coachDecorated = "1";
      const btnGroup = clipEl.querySelector(".mini-accent-btns");
      const ptEl = clipEl.querySelector(".pt-sentence");
      const zhEl = clipEl.querySelector(".zh-sentence");
      if (btnGroup && ptEl) {
        const btn = document.createElement("button");
        btn.className = "mini-prac-btn";
        btn.textContent = "🎙️ 跟读评测";
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          loadTargetIntoCoach(ptEl.textContent, zhEl ? zhEl.textContent : "");
        });
        btnGroup.appendChild(btn);
      }
    });

    // 3. Vocab items
    document.querySelectorAll("#vocabList .vocab-item").forEach((vEl) => {
      if (vEl.dataset.coachDecorated) return;
      vEl.dataset.coachDecorated = "1";
      const btnGroup = vEl.querySelector(".mini-accent-btns");
      const brBox = vEl.querySelector(".vocab-br-top span");
      const ptSpan = vEl.querySelector(".vocab-pt");
      const zhDiv = vEl.querySelector(".vocab-zh");
      if (btnGroup && ptSpan) {
        const rawPt = brBox
          ? brBox.textContent.replace(/^.*巴葡:\s*/, "")
          : ptSpan.textContent.replace(/^🇵🇹\s*/, "");
        const cleanWord = rawPt.replace(/\(.*?\)/g, "").split("/")[0].trim();
        const btn = document.createElement("button");
        btn.className = "mini-prac-btn";
        btn.title = `跟读评测单词: ${cleanWord}`;
        btn.textContent = "🎙️";
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          loadTargetIntoCoach(cleanWord, zhDiv ? zhDiv.textContent : "");
        });
        btnGroup.appendChild(btn);
      }
    });
  }

  function observeUnitReRenders() {
    const targets = ["dialoguesList", "brTvClipsList", "vocabList"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length || !window.MutationObserver) return;
    const obs = new MutationObserver(() => decorateExistingPageItems());
    targets.forEach((el) => obs.observe(el, { childList: true }));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      mountCoachCard();
      observeUnitReRenders();
    });
  } else {
    mountCoachCard();
    observeUnitReRenders();
  }
})();
