// 《大学葡萄牙语 1》课程结构、音频、页码与精读数据
window.COURSE_DATA = {
  bookTitle: "大学葡萄牙语 1",
  bookSubtitle: "Português Universitário Vol. 1",
  totalPages: 311,
  pageOffset: 13, // PDF页码 = 书本标称页码 + 13
  units: [
    {
      id: "intro",
      badge: "导学",
      titlePt: "Alfabeto e Abreviaturas",
      titleZh: "字母表与缩略语表",
      bookPages: [-8, -7],
      pdfPages: [5, 13],
      sections: [
        { label: "字母表", pdfPage: 5 },
        { label: "缩略语", pdfPage: 6 },
        { label: "目录", pdfPage: 7 }
      ],
      tracks: [
        { id: 387267853, type: "fonetica", label: "字母发音 (Alfabeto)", duration: 31, file: "audio/387267853.mp3", jumpPage: 5 }
      ],
      grammarPoints: [
        "葡萄牙语共有 26 个字母（其中 K、W、Y 为外来字母）。",
        "5 个元音字母：a, e, i, o, u；其余为辅音字母。",
        "字母的名称与它在单词中的实际音素读法并不完全一致，需结合发音规则掌握。"
      ],
      dialogues: [
        {
          section: "Alfabeto 字母名称对照",
          lines: [
            { speaker: "A - G", pt: "A (á), B (bê), C (cê), D (dê), E (é), F (efe), G (gê / guê)", zh: "A 到 G 的葡语字母名称读法" },
            { speaker: "H - N", pt: "H (agá), I (i), J (jota), K (capa), L (ele), M (eme), N (ene)", zh: "H 到 N（注意 H 不发音，名称为 agá，J 为 jota）" },
            { speaker: "O - U", pt: "O (ó), P (pê), Q (quê), R (erre), S (esse), T (tê), U (u)", zh: "O 到 U（注意 Q 为 quê，R 为颤音 erre）" },
            { speaker: "V - Z", pt: "V (vê), W (dáblio), X (xis), Y (ípsilon), Z (zê)", zh: "V 到 Z（注意 X 名称为 xis，Y 为 ípsilon）" }
          ]
        }
      ],
      vocab: [
        { pt: "adj. (adjectivo)", pos: "缩略语", zh: "形容词 (adj. 2 gén. 双性形容词)" },
        { pt: "adv. (advérbio)", pos: "缩略语", zh: "副词" },
        { pt: "art. def. / indef.", pos: "缩略语", zh: "定冠词 / 不定冠词" },
        { pt: "m. / f. / pl.", pos: "缩略语", zh: "阳性名词 / 阴性名词 / 复数" },
        { pt: "pron. pess. / poss.", pos: "缩略语", zh: "人称代词 / 物主代词" },
        { pt: "v. intr. / v. tr. / v. refl.", pos: "缩略语", zh: "不及物动词 / 及物动词 / 反身动词" }
      ]
    },
    {
      id: "u1",
      badge: "Unidade 1",
      titlePt: "Bom dia. Como te chamas?",
      titleZh: "早上好！你叫什么名字？",
      bookPages: [1, 14],
      pdfPages: [14, 27],
      sections: [
        { label: "单元导览", pdfPage: 14 },
        { label: "课文词汇", pdfPage: 15 },
        { label: "语音规则", pdfPage: 16 },
        { label: "语法讲解", pdfPage: 20 },
        { label: "课后练习", pdfPage: 24 }
      ],
      tracks: [
        { id: 387268102, type: "texto", label: "第1课 课文 (Texto)", duration: 38, file: "audio/387268102.mp3", jumpPage: 15 },
        { id: 387268196, type: "vocab", label: "第1课 单词 (Vocabulário)", duration: 33, file: "audio/387268196.mp3", jumpPage: 15 },
        { id: 387267973, type: "fonetica", label: "第1课 发音 (Fonética)", duration: 209, file: "audio/387267973.mp3", jumpPage: 16 },
        { id: 387268467, type: "exercicios", label: "第1课 练习 (Exercícios)", duration: 153, file: "audio/387268467.mp3", jumpPage: 24 }
      ],
      grammarPoints: [
        "主格人称代词：eu (我), tu (你), ele/ela (他/她), você/o senhor/a senhora (您)",
        "不规则动词 ser（是）单数变位：eu sou, tu és, ele/ela/você é",
        "代词式动词 chamar-se（名叫）：eu chamo-me, tu chamas-te, ele/ela chama-se",
        "前置词 de 表示籍贯来源：Sou de Pequim（我是北京人），donde = de + onde（从哪里/哪儿人）"
      ],
      dialogues: [
        {
          section: "Texto I · 初次见面问姓名与籍贯",
          lines: [
            { speaker: "Wang Gang", pt: "Bom dia. Chamo-me Wang Gang e sou de Pequim. E tu, como te chamas?", zh: "早上好。我叫王刚，我是北京人。你呢，你叫什么名字？" },
            { speaker: "Li Ming", pt: "Bom dia. Chamo-me Li Ming. Sou de Xangai.", zh: "早上好。我叫李明。我是上海人。" }
          ]
        },
        {
          section: "Texto II · 询问第三人称（她）",
          lines: [
            { speaker: "A", pt: "Como se chama ela?", zh: "她叫什么名字？" },
            { speaker: "B", pt: "Ela chama-se Xiao Mei.", zh: "她叫小梅。" },
            { speaker: "A", pt: "Donde é?", zh: "她是哪儿人？" },
            { speaker: "B", pt: "É de Tianjin.", zh: "她是天津人。" }
          ]
        },
        {
          section: "Texto III & IV · 尊称问答（肯定与否定）",
          lines: [
            { speaker: "A", pt: "O senhor é de Nanquim?", zh: "先生，您是南京人吗？" },
            { speaker: "B", pt: "Sim, sou.", zh: "是的，我是。" },
            { speaker: "A", pt: "A senhora é de Cantão?", zh: "女士，您是广州人吗？" },
            { speaker: "B", pt: "Não, não sou. Sou de Macau.", zh: "不，我不是。我是澳门人。" }
          ]
        },
        {
          section: "Expressões usuais · 日常用语",
          lines: [
            { speaker: "问候", pt: "Olá! / Bom dia! / Boa tarde! / Boa noite!", zh: "嘿！你好！ / 早上好！ / 下午好！ / 晚上好！" }
          ]
        }
      ],
      vocab: [
        { pt: "Bom dia.", pos: "日常", zh: "早上好！" },
        { pt: "chamar-se", pos: "v. pron.", zh: "名字叫…… (chamo-me / chamas-te / chama-se)" },
        { pt: "ser", pos: "v. intr.", zh: "是（联系动词：sou / és / é）" },
        { pt: "como", pos: "adv.", zh: "如何，怎样" },
        { pt: "de", pos: "prep.", zh: "用于地名之前，表示来源地" },
        { pt: "donde", pos: "缩合", zh: "de + onde 的连写形式：哪儿的" },
        { pt: "o senhor / a senhora", pos: "尊称", zh: "（先生 / 女士、太太）您" },
        { pt: "tu / ela", pos: "pron. pess.", zh: "你 / 她" },
        { pt: "sim / não", pos: "adv.", zh: "是 / 不" },
        { pt: "e", pos: "conj.", zh: "和，与；那么" },
        { pt: "Pequim / Xangai / Tianjin", pos: "地名", zh: "北京 / 上海 / 天津" },
        { pt: "Nanquim / Cantão / Macau", pos: "地名", zh: "南京 / 广州 / 澳门" }
      ]
    },
    {
      id: "u2",
      badge: "Unidade 2",
      titlePt: "Olá! Estás bom?",
      titleZh: "嘿！你好吗？",
      bookPages: [15, 29],
      pdfPages: [28, 42],
      sections: [
        { label: "单元导览", pdfPage: 28 },
        { label: "课文词汇", pdfPage: 29 },
        { label: "语音规则", pdfPage: 31 },
        { label: "语法讲解", pdfPage: 36 },
        { label: "课后练习", pdfPage: 38 }
      ],
      tracks: [
        { id: 387269153, type: "texto", label: "第2课 课文 (Texto)", duration: 51, file: "audio/387269153.mp3", jumpPage: 29 },
        { id: 387269070, type: "vocab", label: "第2课 单词 (Vocabulário)", duration: 53, file: "audio/387269070.mp3", jumpPage: 29 },
        { id: 387268764, type: "fonetica", label: "第2课 发音 (Fonética)", duration: 266, file: "audio/387268764.mp3", jumpPage: 31 },
        { id: 387269292, type: "exercicios", label: "第2课 练习 (Exercícios)", duration: 215, file: "audio/387269292.mp3", jumpPage: 38 }
      ],
      grammarPoints: [
        "不规则动词 estar（处于某种状态）变位：eu estou, tu estás, ele/ela/você está",
        "名词与形容词的阴阳两性：阳性多以 -o 结尾（amigo, bom, óptimo），阴性多以 -a 结尾（amiga, boa, óptima）",
        "道谢的性别区分：男性说 obrigado，女性说 obrigada",
        "定冠词单数：阳性 o，阴性 a（在葡国葡语中，人名前常加定冠词，如 o Nuno, a Sofia）"
      ],
      dialogues: [
        {
          section: "Texto I · 朋友间问候近况",
          lines: [
            { speaker: "António", pt: "Olá! Afonso. Estás bom?", zh: "你好！阿丰索。你好吗？" },
            { speaker: "Afonso", pt: "Olá! António. Eu estou bem. E tu, tudo bem?", zh: "你好！安东尼奥。我很好。你呢，一切都好吗？" },
            { speaker: "António", pt: "Tudo bem.", zh: "一切都好。" }
          ]
        },
        {
          section: "Texto II · 师生间礼貌问候",
          lines: [
            { speaker: "Ana", pt: "Bom dia, professor.", zh: "老师，早上好。" },
            { speaker: "Professor", pt: "Bom dia, Ana. Estás boa?", zh: "早上好，安娜。你好吗？（对女性用 boa）" },
            { speaker: "Ana", pt: "Estou bem, obrigada. E o professor, como está?", zh: "我很好，谢谢（女性用 obrigada）。老师您呢，您怎么样？" },
            { speaker: "Professor", pt: "Também estou bem, obrigado.", zh: "我也很好，谢谢（男性用 obrigado）。" }
          ]
        },
        {
          section: "Texto III & IV · 认识新朋友与介绍他人",
          lines: [
            { speaker: "Leandro", pt: "Tu és o Nuno?", zh: "你是努诺吗？" },
            { speaker: "Nuno", pt: "Sou.", zh: "我是。" },
            { speaker: "Leandro", pt: "Eu sou o amigo do Miguel, o Leandro.", zh: "我是米格尔的朋友，莱安德鲁。" },
            { speaker: "Nuno", pt: "Olá! Leandro. Muito prazer. Como estás?", zh: "你好！莱安德鲁。很高兴认识你。你好吗？" },
            { speaker: "Leandro", pt: "Bem, obrigado. E tu, estás bom?", zh: "很好，谢谢。你呢，你好吗？" },
            { speaker: "Nuno", pt: "Estou óptimo, obrigado.", zh: "我非常好，谢谢。" },
            { speaker: "Ana", pt: "Ema, esta é a Sofia.", zh: "艾玛，这位是索菲娅。" },
            { speaker: "Ema / Sofia", pt: "Muito prazer. Ema da Silva. / Muito prazer. Sofia Mendes.", zh: "很高兴认识你。我是艾玛·达·希尔瓦。/ 索菲娅·门德斯。" }
          ]
        },
        {
          section: "Expressões usuais · 告别用语",
          lines: [
            { speaker: "告别", pt: "Adeus. / Até logo. / Até amanhã. / Até já. / Tchau.", zh: "再见！ / 回头见！ / 明天见！ / 待会儿见！ / 拜拜！" }
          ]
        }
      ],
      vocab: [
        { pt: "estar", pos: "v. intr.", zh: "处于（某种状态）：estou / estás / está" },
        { pt: "bom / boa", pos: "adj.", zh: "好的（阳性 / 阴性）" },
        { pt: "bem", pos: "adv.", zh: "好，安好" },
        { pt: "óptimo / óptima", pos: "adj.", zh: "很好的，极好的（阳性 / 阴性）" },
        { pt: "obrigado / obrigada", pos: "interj.", zh: "谢谢！（男性自称用 / 女性自称用）" },
        { pt: "Muito prazer.", pos: "日常", zh: "很高兴（认识你）。" },
        { pt: "amigo / amiga", pos: "m. / f.", zh: "男性朋友 / 女性朋友" },
        { pt: "professor / professora", pos: "m. / f.", zh: "男老师 / 女老师" },
        { pt: "este / esta", pos: "pron. dem.", zh: "这个，这位（阳性 / 阴性）" },
        { pt: "muito", pos: "adj. / adv.", zh: "很多的；很，非常" },
        { pt: "também", pos: "adv.", zh: "也" },
        { pt: "tudo", pos: "pron. indef.", zh: "所有，一切" }
      ]
    },
    {
      id: "u3",
      badge: "Unidade 3",
      titlePt: "Quem é ele?",
      titleZh: "他是谁？",
      bookPages: [30, 47],
      pdfPages: [43, 60],
      sections: [
        { label: "单元导览", pdfPage: 43 },
        { label: "课文词汇", pdfPage: 44 },
        { label: "语音规则", pdfPage: 47 },
        { label: "语法讲解", pdfPage: 51 },
        { label: "课后练习", pdfPage: 55 }
      ],
      tracks: [
        { id: 387269605, type: "texto", label: "第3课 课文 (Texto)", duration: 72, file: "audio/387269605.mp3", jumpPage: 44 },
        { id: 387269747, type: "vocab", label: "第3课 单词 (Vocabulário)", duration: 118, file: "audio/387269747.mp3", jumpPage: 45 },
        { id: 387269474, type: "fonetica", label: "第3课 发音 (Fonética)", duration: 134, file: "audio/387269474.mp3", jumpPage: 47 }
      ],
      grammarPoints: [
        "复数主格代词与动词变位：nós somos/estamos, eles/elas/vocês são/estão",
        "欧洲葡语现在进行时：estar a + 动词不定式（如：Estão a estudar chinês 正在学中文）",
        "物主代词：meu/minha（我的），nosso/nossa（我们的），dele/dela/deles/delas（他的/她的/他们的）",
        "前置词 de/em 与定冠词缩合：de+o=do, de+a=da; em+o=no, em+a=na",
        "八大葡语国家（CPLP）：葡萄牙、巴西、安哥拉、莫桑比克、佛得角、几内亚比绍、圣多美和普林西比、东帝汶"
      ],
      dialogues: [
        {
          section: "Texto I · 介绍葡语外教",
          lines: [
            { speaker: "A", pt: "Quem é ele?", zh: "他是谁？" },
            { speaker: "B", pt: "Ele é o nosso professor de português, chama-se João.", zh: "他是我们的葡萄牙语老师，名叫若昂。" },
            { speaker: "A", pt: "É português?", zh: "他是葡萄牙人吗？" },
            { speaker: "B", pt: "Sim, é.", zh: "是的，他是。" },
            { speaker: "A", pt: "É de Lisboa?", zh: "他是里斯本人吗？" },
            { speaker: "B", pt: "Não, é do Porto.", zh: "不，他是波尔图人。" }
          ]
        },
        {
          section: "Texto II · 来自巴西的留学生",
          lines: [
            { speaker: "A", pt: "Como se chamam eles?", zh: "他们叫什么名字？" },
            { speaker: "B", pt: "O moço chama-se Jorge e as moças chamam-se Sofia e Lídia.", zh: "那个小伙子叫若热，那两个姑娘叫索菲娅和莉迪娅。" },
            { speaker: "A", pt: "De que país são?", zh: "他们是哪个国家的？" },
            { speaker: "B", pt: "São do Brasil.", zh: "他们来自巴西。" },
            { speaker: "A", pt: "De que cidade?", zh: "哪个城市的？" },
            { speaker: "B", pt: "O Jorge é de Brasília, a Sofia é de São Paulo e a Lídia é do Rio de Janeiro.", zh: "若热来自巴西利亚，索菲娅来自圣保罗，莉迪娅来自里约热内卢。" },
            { speaker: "A", pt: "E o que é que estão a fazer na China?", zh: "那他们在中国正在做什么呢？" },
            { speaker: "B", pt: "Estão a estudar chinês na nossa Universidade.", zh: "他们正在我们大学学习中文。" }
          ]
        },
        {
          section: "Texto III · 安哥拉与莫桑比克同学",
          lines: [
            { speaker: "Landu", pt: "Eu sou o Landu e ele é o Adelino. Somos angolanos e somos de Luanda.", zh: "我是兰杜，他是阿德利诺。我们是安哥拉人，来自罗安达。" },
            { speaker: "Colega", pt: "Elas são a Mónica e a Helena. São nossas colegas e são moçambicanas. São de Maputo.", zh: "她们是莫妮卡和海伦娜。是我们的同学，是莫桑比克人，来自马普托。" },
            { speaker: "Wang Gang", pt: "Eu sou amigo deles. Sou chinês e sou estudante de português. Estou a estudar português na Universidade de Línguas Estrangeiras.", zh: "我是他们的朋友。我是中国人，是葡语系学生。我正在外国语大学学习葡萄牙语。" }
          ]
        }
      ],
      vocab: [
        { pt: "quem / o que", pos: "pron. interr.", zh: "谁 / 什么" },
        { pt: "português / chinês", pos: "m. / adj.", zh: "葡萄牙语、葡萄牙人 / 汉语、中国人" },
        { pt: "brasileiro / angolano / moçambicano", pos: "m. / adj.", zh: "巴西人 / 安哥拉人 / 莫桑比克人" },
        { pt: "Lisboa / Porto", pos: "城市", zh: "里斯本（葡首都） / 波尔图（葡第二大城市）" },
        { pt: "Brasília / São Paulo / Rio de Janeiro", pos: "城市", zh: "巴西利亚 / 圣保罗 / 里约热内卢" },
        { pt: "Luanda / Maputo", pos: "城市", zh: "罗安达（安哥拉首都） / 马普托（莫桑比克首都）" },
        { pt: "moço / moça", pos: "m. / f.", zh: "小伙子 / 姑娘" },
        { pt: "colega / estudante", pos: "s. 2 gén.", zh: "同事、同学 / 学生、大学生（阴阳同形）" },
        { pt: "país / cidade / universidade", pos: "名", zh: "国家 (m.) / 城市 (f.) / 大学 (f.)" },
        { pt: "língua / estrangeiro", pos: "f. / adj.", zh: "语言 / 外国的、外国人" },
        { pt: "estudar / fazer", pos: "v. tr.", zh: "学习 / 做，干" },
        { pt: "estar a + inf.", pos: "语法", zh: "正在做某事（现在进行时）" }
      ]
    },
    {
      id: "u4",
      badge: "Unidade 4",
      titlePt: "Como é ela?",
      titleZh: "她是什么样的？",
      bookPages: [48, 62],
      pdfPages: [61, 75],
      sections: [
        { label: "单元导览", pdfPage: 61 },
        { label: "课文词汇", pdfPage: 62 },
        { label: "语音规则", pdfPage: 65 },
        { label: "语法讲解", pdfPage: 68 },
        { label: "课后练习", pdfPage: 71 }
      ],
      tracks: [
        { id: 387269969, type: "texto", label: "第4课 课文 (Texto)", duration: 82, file: "audio/387269969.mp3", jumpPage: 62 },
        { id: 387269893, type: "vocab", label: "第4课 单词 (Vocabulário)", duration: 513, file: "audio/387269893.mp3", jumpPage: 63 }
      ],
      grammarPoints: [
        "第一变位规则动词（-ar 结尾，如 estudar, usar, gostar）变位：-o, -as, -a, -amos, -am",
        "不规则动词 ter（有）现在时变位：eu tenho, tu tens, ele tem, nós temos, eles têm",
        "gostar de + 名词/代词（喜欢……）：Todos nós gostamos muito dele（我们大家都很喜欢他）",
        "外貌与性格描述：ser + 特征形容词（É alta e magra）；ter + 身体部位特征（Tem o cabelo ondulado）"
      ],
      dialogues: [
        {
          section: "Texto I · 描述女性外貌",
          lines: [
            { speaker: "A", pt: "Como é ela?", zh: "她长什么样？" },
            { speaker: "B", pt: "Ela é loira. É alta e magra. Tem o cabelo ondulado, a cara oval e os olhos grandes.", zh: "她是金发女郎。又高又瘦。有着波浪形的头发、瓜子脸和大眼睛。" },
            { speaker: "A", pt: "É bonita?", zh: "她漂亮吗？" },
            { speaker: "B", pt: "Não é feia.", zh: "不丑（挺漂亮的）。" }
          ]
        },
        {
          section: "Texto II · 描述男同学的外貌与品格",
          lines: [
            { speaker: "A", pt: "Como são eles?", zh: "他们是什么样的人？" },
            { speaker: "B", pt: "O Jorge é moreno. É alto e forte. Tem o cabelo liso e a cara comprida. O Adelino é negro. Ele não é muito alto. Tem o cabelo curto e a cara redonda. Ele usa óculos.", zh: "若热肤色较深、黑发，又高又壮，直发长脸。阿德利诺是黑人，不算很高，短发圆脸，戴着眼镜。" },
            { speaker: "A", pt: "Eles são bons alunos?", zh: "他们是好学生吗？" },
            { speaker: "B", pt: "São. O Jorge é muito inteligente e o Adelino é muito estudioso. Ambos estudam bem chinês.", zh: "是的。若热非常聪明，阿德利诺非常用功。两个人中文都学得很好。" }
          ]
        },
        {
          section: "Texto III · O nosso leitor de português（我们的葡语外教）",
          lines: [
            { speaker: "短文 1", pt: "O nosso leitor é um português. Ele é de Coimbra e chama-se Filipe Mendes. Ele tem a pele clara e o cabelo preto. Ele é de altura média, não é gordo nem é magro. Usa bigode e é elegante.", zh: "我们的外教是一位葡萄牙人。他来自科英布拉，名叫菲利佩·门德斯。他皮肤白皙，黑头发。中等身材，不胖也不瘦。留着小胡子，很有风度。" },
            { speaker: "短文 2", pt: "O Dr. Mendes é uma pessoa simpática e paciente. É também um professor experiente e trabalhador. As aulas dele são interessantes e todos nós gostamos muito dele.", zh: "门德斯老师是个和蔼且有耐心的人。也是一位经验丰富、勤奋敬业的老师。他的课很有趣，我们大家都很喜欢他。" }
          ]
        }
      ],
      vocab: [
        { pt: "ter / usar / gostar (de)", pos: "v.", zh: "有 (tenho/tens/tem/temos/têm) / 使用、戴、留 / 喜欢" },
        { pt: "alto / baixo / altura média", pos: "adj.", zh: "高的 / 矮的 / 中等身高" },
        { pt: "gordo / magro / forte", pos: "adj.", zh: "胖的 / 瘦的 / 强壮的" },
        { pt: "bonito / feio / elegante", pos: "adj.", zh: "漂亮的 / 丑的 / 优雅帅气的" },
        { pt: "loiro / moreno / negro", pos: "adj.", zh: "金发的 / 黑发小麦肤色的 / 黑人、黑色的" },
        { pt: "cabelo (ondulado / liso / curto)", pos: "m.", zh: "头发（波浪形的 / 直的 / 短的）" },
        { pt: "cara (oval / comprida / redonda)", pos: "f.", zh: "脸（椭圆形的 / 长的 / 圆的）" },
        { pt: "olho / pele / bigode / óculos", pos: "名", zh: "眼睛 / 皮肤 / 小胡子 / 眼镜 (m. pl.)" },
        { pt: "inteligente / estudioso / trabalhador", pos: "adj.", zh: "聪明的 / 勤奋好学的 / 勤劳的" },
        { pt: "simpático / paciente / experiente", pos: "adj.", zh: "和蔼可亲的 / 有耐心的 / 有经验的" },
        { pt: "leitor / aula / aluno", pos: "名", zh: "外籍教师 (m.) / 课 (f.) / 学生 (m.)" },
        { pt: "não ... nem ... / ambos", pos: "结构", zh: "既不……也不…… / 两者都" }
      ]
    },
    {
      id: "u5",
      badge: "Unidade 5",
      titlePt: "Quem é aquela rapariga de vermelho?",
      titleZh: "那个穿红衣服的姑娘是谁？",
      bookPages: [63, 80],
      pdfPages: [76, 93],
      sections: [
        { label: "单元导览", pdfPage: 76 },
        { label: "课文词汇", pdfPage: 77 },
        { label: "语音规则", pdfPage: 81 },
        { label: "语法讲解", pdfPage: 83 },
        { label: "课后练习", pdfPage: 87 }
      ],
      tracks: [
        { id: 387270925, type: "texto", label: "第5课 课文 (Texto)", duration: 100, file: "audio/387270925.mp3", jumpPage: 77 },
        { id: 387270832, type: "vocab", label: "第5课 单词 (Vocabulário)", duration: 290, file: "audio/387270832.mp3", jumpPage: 78 }
      ],
      grammarPoints: [
        "空间三级指示代词与地点副词对应：este/esta (aqui 这里，离说话人近) · esse/essa (aí 那里，离听话人近) · aquele/aquela (ali 那边，离双方都远)",
        "衣着表达：de + 颜色（de vermelho 穿红衣服的）；estar vestido/a com...（穿着……）",
        "特殊颜色词：cor-de-rosa（粉红色）和 cor-de-laranja（橙色）在修饰名词时性数不变！"
      ],
      dialogues: [
        {
          section: "Texto I & II · 询问衣着与人物身份",
          lines: [
            { speaker: "A", pt: "Quem é aquela rapariga de vermelho?", zh: "那边那个穿红衣服的姑娘是谁？" },
            { speaker: "B", pt: "É a nova presidente da Associação de Estudantes da Faculdade.", zh: "她是学院学生会的新任主席。" },
            { speaker: "A", pt: "Quem são aqueles rapazes de branco?", zh: "那边那几个穿白衣服的小伙子是谁？" },
            { speaker: "B", pt: "São os membros da equipa de futebol da Universidade.", zh: "他们是大学足球队的队员。" },
            { speaker: "A", pt: "Como é que ele está vestido?", zh: "他穿得怎么样？" },
            { speaker: "B", pt: "Ele está vestido com uma camisa azul às riscas, um fato escuro e um par de sapatos pretos. Usa uma gravata amarela.", zh: "他穿着一件蓝条纹衬衫、一套深色西装和一双黑皮鞋。系着一条黄领带。" },
            { speaker: "A", pt: "Como é que a Ana está vestida?", zh: "安娜穿得怎么样？" },
            { speaker: "B", pt: "Ela está vestida com uma blusa às bolinhas e uma saia vermelha escura.", zh: "她穿着一件波点女式衬衣和一条暗红色短裙。" }
          ]
        },
        {
          section: "Texto III · 指示代词与颜色看图问答",
          lines: [
            { speaker: "远近对比", pt: "Este casaco é cinzento. / Esse vestido é colorido. / Aquela camisola é cor-de-rosa.", zh: "这件外套是灰色的。/ 你那条连衣裙是彩色的。/ 远处那件毛衣是粉红色的。" },
            { speaker: "复数对比", pt: "Estas mochilas são cinzentas escuras. / Essas calças são azuis. / Aqueles cartazes são coloridos.", zh: "这些双肩包是深灰色的。/ 那条裤子是蓝色的。/ 远处的那些海报是彩色的。" },
            { speaker: "国旗颜色", pt: "A bandeira brasileira é verde, amarela e azul. / A bandeira portuguesa é verde, vermelha e amarela. / A bandeira chinesa é vermelha e amarela.", zh: "巴西国旗是绿、黄、蓝三色。/ 葡萄牙国旗是绿、红、黄三色。/ 中国国旗是红、黄两色。" }
          ]
        }
      ],
      vocab: [
        { pt: "aqui / aí / ali", pos: "adv.", zh: "这里（近我） / 那里（近你） / 那边（远他）" },
        { pt: "este / esse / aquele", pos: "pron. dem.", zh: "这 / 那（你那儿） / 那（远处）" },
        { pt: "vermelho / amarelo / azul / verde", pos: "颜色", zh: "红色的 / 黄色的 / 蓝色的 / 绿色的" },
        { pt: "branco / preto / cinzento / escuro", pos: "颜色", zh: "白色的 / 黑色的 / 灰色的 / 深暗色的" },
        { pt: "cor-de-rosa / cor-de-laranja / dourado / prateado", pos: "颜色", zh: "粉红色的 / 橙色的 / 金色的 / 银色的" },
        { pt: "camisa / blusa / camisola / casaco", pos: "服饰", zh: "男式衬衫 / 女式衬衣 / 毛衣 / 外套上衣" },
        { pt: "fato / vestido / saia / calças", pos: "服饰", zh: "西装套装 / 连衣裙 / 短裙 / 裤子(常复数)" },
        { pt: "gravata / sapato / mochila", pos: "服饰", zh: "领带 / 皮鞋 / 双肩背包" },
        { pt: "às riscas / às bolinhas / aos quadrados", pos: "loc. adj.", zh: "条纹的 / 小圆点(波点)的 / 格子的" },
        { pt: "rapariga / rapaz", pos: "f. / m.", zh: "姑娘、女孩子 / 小伙子、男孩子" }
      ]
    },
    {
      id: "teste1",
      badge: "Teste 1",
      titlePt: "Teste de Revisão 1 (Unidades 1–5)",
      titleZh: "阶段测验 1（第 1～5 课综合复习）",
      bookPages: [81, 84],
      pdfPages: [94, 97],
      sections: [
        { label: "测验第1页", pdfPage: 94 },
        { label: "测验第2页", pdfPage: 95 },
        { label: "测验第3页", pdfPage: 96 },
        { label: "测验第4页", pdfPage: 97 }
      ],
      tracks: [],
      grammarPoints: [
        "涵盖第 1～5 单元语音、名词/形容词性数变化、ser/estar/ter/规则动词 -ar 变位及指示代词综合自测。",
        "建议切换到「原书扫描」模式直接查看试卷题目进行自我检测。"
      ],
      dialogues: [],
      vocab: []
    },
    {
      id: "u6",
      badge: "Unidade 6",
      titlePt: "Qual é o teu número de telefone?",
      titleZh: "你的电话号码是多少？",
      bookPages: [85, 98],
      pdfPages: [98, 111],
      sections: [
        { label: "单元导览", pdfPage: 98 },
        { label: "课文词汇", pdfPage: 99 },
        { label: "语法讲解", pdfPage: 102 },
        { label: "课后练习", pdfPage: 106 }
      ],
      tracks: [
        { id: 387271597, type: "texto", label: "第6课 课文 (Texto)", duration: 110, file: "audio/387271597.mp3", jumpPage: 99 },
        { id: 387271419, type: "vocab", label: "第6课 单词 (Vocabulário)", duration: 62, file: "audio/387271419.mp3", jumpPage: 100 }
      ],
      grammarPoints: [
        "第二变位（-er）、第三变位（-ir）及第四变位（-or，如 pôr）规则动词现在时变位",
        "常用不规则动词：ir (vou/vais/vai/vamos/vão), fazer (faço/fazes/faz...), dizer (digo...), poder (posso...), saber (sei...)",
        "将来计划短语：ir + 动词不定式（如：Vou ter aulas de inglês 我要去上英语课）",
        "基数词 0–10：zero, um/uma, dois/duas, três, quatro, cinco, seis, sete, oito, nove, dez",
        "反问疑问句（确认疑问尾句）：肯定句后加 , não + 动词?；否定句后加 , pois não?"
      ],
      dialogues: [
        {
          section: "Texto I & II · 询问住处与电话号码",
          lines: [
            { speaker: "A", pt: "Onde moras?", zh: "你住在哪里？" },
            { speaker: "B", pt: "Moro no dormitório da Universidade.", zh: "我住在大学宿舍里。" },
            { speaker: "A", pt: "E tens telefone no dormitório? Qual é o número?", zh: "你宿舍里有电话吗？号码是多少？" },
            { speaker: "B", pt: "Tenho. É o 68913579.", zh: "有。是 68913579。" },
            { speaker: "A", pt: "Tens telemóvel, não tens? E posso saber o número?", zh: "你有手机，不是吗？我能知道号码吗？" },
            { speaker: "B", pt: "Tenho, sim. Claro. É o 13810482967.", zh: "有的。当然可以，是 13810482967。" }
          ]
        },
        {
          section: "Texto III & IV · 操场踢球与去教室上课",
          lines: [
            { speaker: "A", pt: "Onde estão os nossos colegas? O que é que estão a fazer?", zh: "我们的同学们在哪儿？他们正在干什么？" },
            { speaker: "B", pt: "Estão no campo de jogos. Estão a jogar futebol.", zh: "他们在操场上。正在踢足球。" },
            { speaker: "A", pt: "Onde é que vais? O que é que vais fazer?", zh: "你要去哪儿？你要去做什么？" },
            { speaker: "B", pt: "Vou à sala de aula. Vou ter aulas de inglês.", zh: "我要去教室。我要去上英语课。" }
          ]
        },
        {
          section: "Texto V · 在里斯本大学文学院秘书处登记",
          lines: [
            { speaker: "背景", pt: "O Lin Xiao é um estudante chinês e está a estudar português em Lisboa, no Departamento de Português da Faculdade de Letras da Universidade de Lisboa. Agora ele está na secretaria do Departamento a falar com a D. Irene, secretária administrativa do Departamento.", zh: "林晓是一名中国学生，正在里斯本大学文学院葡语系学习葡萄牙语。现在他在系秘书处跟行政秘书伊蕾娜女士交谈。" },
            { speaker: "Irene", pt: "O senhor não mora na pensão da Universidade, pois não?", zh: "先生，您不住在大学的公寓里，是吧？" },
            { speaker: "Lin Xiao", pt: "Não. Moro em casa duma família portuguesa.", zh: "是的（不住那儿）。我住在一个葡萄牙人家里。" },
            { speaker: "Irene", pt: "E tem telefone? Pode dizer-me o número?", zh: "有电话吗？能告诉我号码吗？" },
            { speaker: "Lin Xiao", pt: "Tenho. O do telefone fixo ou o do telemóvel?", zh: "有。固定电话的还是手机的？" },
            { speaker: "Irene", pt: "Ambos, pode ser?", zh: "两个都要，可以吗？" },
            { speaker: "Lin Xiao", pt: "Com certeza. O do telefone fixo é o 214298725 e o do telemóvel é o 9683058276.", zh: "当然可以。座机是 214298725，手机是 9683058276。" },
            { speaker: "Irene / Lin Xiao", pt: "Muito obrigada. — De nada.", zh: "非常感谢。——不客气。" }
          ]
        }
      ],
      vocab: [
        { pt: "morar / falar / jogar", pos: "v.", zh: "居住 (em) / 讲、说话 (com) / 踢、打（球）" },
        { pt: "ir / poder / saber / dizer", pos: "v.", zh: "去 / 可以、能够 / 知道 / 说、告诉" },
        { pt: "telefone fixo / telemóvel", pos: "m.", zh: "固定电话（座机） / 移动电话（手机）" },
        { pt: "número (de telefone)", pos: "m.", zh: "（电话）号码；数字" },
        { pt: "dormitório / pensão / casa", pos: "名", zh: "宿舍 (m.) / 公寓 (f.) / 家、房子 (f.)" },
        { pt: "campo de jogos / sala de aula", pos: "名", zh: "操场 / 教室" },
        { pt: "secretaria / secretária", pos: "f.", zh: "秘书处（重音在 i） / 女秘书、写字台（重音在 á）" },
        { pt: "Com certeza. / Claro. / De nada.", pos: "日常", zh: "当然可以，没问题 / 当然 / 不客气" }
      ]
    },
    {
      id: "u7",
      badge: "Unidade 7",
      titlePt: "O que é que faz?",
      titleZh: "你做什么工作的？",
      bookPages: [99, 114],
      pdfPages: [112, 127],
      sections: [
        { label: "单元导览", pdfPage: 112 },
        { label: "课文词汇", pdfPage: 113 },
        { label: "语法讲解", pdfPage: 117 },
        { label: "课后练习", pdfPage: 122 }
      ],
      tracks: [
        { id: 387271793, type: "texto", label: "第7课 课文 (Texto)", duration: 89, file: "audio/387271793.mp3", jumpPage: 113 },
        { id: 387271703, type: "vocab", label: "第7课 单词 (Vocabulário)", duration: 181, file: "audio/387271703.mp3", jumpPage: 114 }
      ],
      grammarPoints: [
        "询问年龄：Quantos anos tem? / Que idade é que tem? — Tenho 21 anos.",
        "不规则动词 querer（想要/希望）变位：quero, queres, quer, queremos, querem",
        "基数词 11–199（注意百位数 100 单独用 cem，带零头用 cento e...；21 vinte e um）",
        "关系代词 que（引导限定性定语从句，指人或物）与 onde（指地点）：um banco que fica muito perto da nossa casa",
        "葡语职业头衔缩写：Eng.º (Engenheiro 工程师), Arq.ª (Arquitecta 女建筑师), Dr. / Dr.ª"
      ],
      dialogues: [
        {
          section: "Texto I & II · 个人信息、年龄、职业与婚姻状况",
          lines: [
            { speaker: "Funcionário", pt: "Quantos anos tem? Qual é a sua profissão?", zh: "您多大年纪了？您的职业是什么？" },
            { speaker: "Ana", pt: "Tenho 21 anos. Sou enfermeira.", zh: "我 21 岁。我是一名护士。" },
            { speaker: "Funcionário", pt: "Onde trabalha? É casada ou solteira?", zh: "您在哪里工作？已婚还是单身？" },
            { speaker: "Ana", pt: "Trabalho no Hospital da Capital. Sou solteira.", zh: "我在首都医院工作。我是单身。" },
            { speaker: "Funcionária", pt: "Qual é o seu nome? Que idade é que tem? O que é que faz? É casado?", zh: "您叫什么名字？多大年纪？做什么工作？结婚了吗？" },
            { speaker: "João Pereira", pt: "João Pereira. 35. Sou funcionário duma empresa. Não, sou divorciado.", zh: "若昂·佩雷拉。35 岁。我是一家公司的职员。不，我离异了。" }
          ]
        },
        {
          section: "Texto III & IV · 介绍家庭成员的职业",
          lines: [
            { speaker: "Alexandre", pt: "O meu nome é Alexandre e sou estudante universitário. O meu pai é funcionário público e trabalha no governo. A minha mãe é bancária e trabalha num banco que fica muito perto da nossa casa. Tenho um irmão, que é advogado e que é sócio dum escritório de advogados.", zh: "我叫亚历山大，是一名大学生。我父亲是公务员，在政府部门工作。我母亲是银行职员，在离我们家很近的一家银行工作。我有一个哥哥/弟弟，他是律师，也是一家律师事务所的合伙人。" },
            { speaker: "Ricardo", pt: "O Eng.º Ricardo Magalhães é o director-geral duma empresa de importação e exportação. Ele tem 54 anos e é casado com a Arq.ª Inácia dos Santos, que é gerente numa empresa de construção civil. Eles têm dois filhos: um filho e uma filha. O filho tem 26 anos e é técnico numa fábrica estatal; a filha tem 21 anos e estuda Medicina numa universidade privada. Ela quer ser médica.", zh: "里卡多·麦哲伦工程师是一家进出口公司的总经理，54 岁，妻子是伊娜西亚·多斯桑托斯建筑师，她在一家土木建筑公司当经理。他们有两个孩子：一儿一女。儿子 26 岁，在一家国营工厂当技术员；女儿 21 岁，在一所私立大学学医。她想成为一名医生。" }
          ]
        }
      ],
      vocab: [
        { pt: "profissão / trabalho / empresa", pos: "f. / m. / f.", zh: "职业 / 工作 / 公司、企业" },
        { pt: "enfermeira / médica / advogado", pos: "职业", zh: "女护士 / 女医生 / 律师" },
        { pt: "funcionário público / bancário", pos: "职业", zh: "公务员 / 银行职员" },
        { pt: "director-geral / gerente / sócio / técnico", pos: "职业", zh: "总经理 / 经理 / 合伙人 / 技术员" },
        { pt: "Eng.º (engenheiro) / Arq.º (arquitecto)", pos: "头衔", zh: "工程师 / 建筑师" },
        { pt: "casado / solteiro / divorciado", pos: "adj.", zh: "已婚的 (ser casado com) / 单身的 / 离婚的" },
        { pt: "importação e exportação / construção civil", pos: "行业", zh: "进出口 / 土木建筑" },
        { pt: "estatal / privado", pos: "adj.", zh: "国有的、国营的 / 私立的、私营的" },
        { pt: "querer / ficar", pos: "v.", zh: "想要 (quero/queres/quer) / 位于、处在" }
      ]
    },
    {
      id: "u8",
      badge: "Unidade 8",
      titlePt: "Quantos são na tua família?",
      titleZh: "你家有几口人？",
      bookPages: [115, 133],
      pdfPages: [128, 146],
      sections: [
        { label: "单元导览", pdfPage: 128 },
        { label: "课文词汇", pdfPage: 129 },
        { label: "语法讲解", pdfPage: 133 },
        { label: "课后练习", pdfPage: 138 }
      ],
      tracks: [
        { id: 387272155, type: "texto", label: "第8课 课文 (Texto)", duration: 129, file: "audio/387272155.mp3", jumpPage: 129 },
        { id: 387272097, type: "vocab", label: "第8课 单词 (Vocabulário)", duration: 147, file: "audio/387272097.mp3", jumpPage: 130 }
      ],
      grammarPoints: [
        "形容词比较级：mais + adj. + do que...（比……更……）；menos... do que...；tão... como...（和……一样）",
        "特殊比较级：bom → melhor（更好），mau → pior（更坏），grande → maior，pequeno → menor",
        "直接宾语从句：achar que / crer que / pensar que（认为/觉得……）",
        "porque（因为，连词，用于回答）与 porquê（为什么，用于句尾或单独提问）的区别"
      ],
      dialogues: [
        {
          section: "Texto I · 谈论大家庭与城乡生活对比",
          lines: [
            { speaker: "Xiao Mei", pt: "Quantos são na tua família?", zh: "你家有几口人？" },
            { speaker: "Li Ming", pt: "Somos cinco: os meus pais, os meus avós maternos e eu. Os teus avós vivem com vocês?", zh: "我们家五口人：我父母、外公外婆和我。你的爷爷奶奶和你们住在一起吗？" },
            { speaker: "Xiao Mei", pt: "Sim. Tenho os pais do meu pai. Mas eles vivem na terra natal deles, no campo, porque não estão habituados a viver na cidade.", zh: "我有爷爷奶奶。但他们住在农村老家，因为他们不习惯住在城里。" },
            { speaker: "Li Ming", pt: "É natural. No campo a vida é mais calma do que aqui na cidade e o ambiente também é melhor. Sobretudo o ar fresco, que é muito favorável à saúde das pessoas de idade.", zh: "那很自然。农村的生活比城里更宁静，环境也更好。尤其是新鲜空气，对老年人的健康非常有利。" },
            { speaker: "Xiao Mei", pt: "O meu avô tem 78 e a minha avó tem 75. Felizmente estão com boa saúde. Vivem com o meu tio, o irmão mais novo do meu pai.", zh: "我爷爷 78 岁，奶奶 75 岁。庆幸的是他们身体很好。他们和我叔叔（我爸的弟弟）住在一起。" },
            { speaker: "Li Ming", pt: "A geração dos nossos avós tem sempre muitos filhos. Os meus avós, pais da minha mãe, têm no total oito filhos! E agora têm 8 netos!", zh: "我们祖辈那一代总是有很多孩子。我外公外婆总共有 8 个孩子！现在有 8 个孙辈！" },
            { speaker: "Xiao Mei / Li Ming", pt: "Tens inveja dos teus pais? — Porquê? — Porque têm irmãos. — É bom ter irmãos, mas acho que também não é mau ser filho único.", zh: "你羡慕你父母吗？— 为什么？— 因为他们有兄弟姐妹。— 有兄弟姐妹很好，但我觉得当独生子女也不赖。" }
          ]
        },
        {
          section: "Texto II · 双胞胎之家",
          lines: [
            { speaker: "短文", pt: "A minha família não é muito grande: os meus pais, o meu irmão mais novo e eu. E, na verdade, eu e o meu irmão somos gémeos. A minha família é uma família unida, harmoniosa e feliz. Em casa, eu ajudo a minha mãe a fazer os trabalhos domésticos e o meu irmão ajuda o nosso pai a fazer outros trabalhos, como por exemplo lavar o carro. O meu irmão é um rapaz endiabrado e, às vezes, faz coisas de que os meus pais não gostam e ralham com ele. Mas eles nunca batem nele.", zh: "我家不算大：父母、弟弟和我。其实我和弟弟是双胞胎。我们家是一个团结、和睦、幸福的家庭。在家里我帮妈妈做家务，弟弟帮爸爸干别的活，比如洗车。我弟弟是个淘气的小伙子，有时会做父母不喜欢的事，父母会责备他，但从不打他。" }
          ]
        }
      ],
      vocab: [
        { pt: "avô / avó / avós (paternos / maternos)", pos: "亲属", zh: "爷爷、外公 / 奶奶、外婆 / 祖父母（爷爷奶奶 / 外公外婆）" },
        { pt: "tio / tia / neto / gémeos / filho único", pos: "亲属", zh: "叔伯舅 / 姑姨 / 孙子、外孙 / 双胞胎 / 独生子" },
        { pt: "terra natal / campo / ambiente / ar fresco", pos: "名", zh: "故乡、老家 / 农村、田野 / 环境 / 新鲜空气" },
        { pt: "estar habituado a / ser favorável a", pos: "短语", zh: "习惯于…… / 对……有利的" },
        { pt: "calmo / unido / harmonioso / endiabrado", pos: "adj.", zh: "平静的 / 团结的 / 和睦的 / 调皮淘气的" },
        { pt: "trabalhos domésticos / ralhar com / bater em", pos: "短语", zh: "家务活 / 责备某人 / 打某人" },
        { pt: "Ainda bem. / É isso mesmo.", pos: "日常", zh: "幸好！还好！ / 正是如此，可不是嘛。" }
      ]
    },
    {
      id: "u9",
      badge: "Unidade 9",
      titlePt: "A minha casa",
      titleZh: "我的家",
      bookPages: [134, 151],
      pdfPages: [147, 164],
      sections: [
        { label: "单元导览", pdfPage: 147 },
        { label: "课文词汇", pdfPage: 148 },
        { label: "语法讲解", pdfPage: 152 },
        { label: "课后练习", pdfPage: 157 }
      ],
      tracks: [
        { id: 387273150, type: "texto", label: "第9课 课文 (Texto)", duration: 137, file: "audio/387273150.mp3", jumpPage: 148 },
        { id: 387272966, type: "vocab", label: "第9课 单词 (Vocabulário)", duration: 134, file: "audio/387272966.mp3", jumpPage: 149 }
      ],
      grammarPoints: [
        "无人称动词 haver 第三人称单数 há（表示“某处存在/有某物”，无复数变化）：Na sala de estar há três sofás.",
        "方位短语：em frente de（在……对面）、em cima de（在……上面）、ao lado de（在……旁边）、em baixo（在下面）",
        "序数词 1.º – 20.º：primeiro (1.º), segundo (2.º), terceiro (3.º) ... oitavo (8.º andar 八楼)",
        "葡萄牙户型缩写：T2 表示两室一厅（Dois quartos + sala）"
      ],
      dialogues: [
        {
          section: "Texto I · 介绍我的两居室公寓 (T2)",
          lines: [
            { speaker: "格局", pt: "Esta é a minha casa. É um T2 de cerca de 90 m² (metros quadrados) e fica no 8.º andar dum edifício de 12 andares. A casa não é grande: tem uma sala de estar, uma sala de jantar, dois quartos, uma cozinha e uma casa de banho.", zh: "这是我的家。是一套约 90 平方米的两居室（T2），位于一栋 12 层大楼的 8 楼。房子不大：有一个客厅、一个餐厅、两间卧室、一个厨房和一个卫生间。" },
            { speaker: "客餐厅", pt: "Na sala de estar há três sofás, duas mesas baixas e um armário. O armário está em frente dos sofás e em cima dele há um televisor, um aparelho de DVD e duas colunas. A sala de jantar fica ao lado da sala de estar. Na sala de jantar há uma mesa de jantar, quatro cadeiras e um armário.", zh: "客厅里有三张沙发、两张茶几和一个柜子。柜子在沙发对面，上面有一台电视机、一台 DVD 机和两个音箱。餐厅在客厅旁边，里面有一张餐桌、四把椅子和一个柜子。" },
            { speaker: "卧室兼书房", pt: "O meu quarto também é o meu escritório. Por isso, no quarto, além de uma cama individual, uma mesa de cabeceira e um guarda-roupa, há ainda uma secretária, uma cadeira giratória e uma estante. Em cima da secretária há um computador portátil, um candeeiro, um dicionário português-chinês e alguns livros. O meu quarto não tem varanda.", zh: "我的卧室也是我的书房。因此房间里除了单人床、床头柜和衣柜外，还有一张书桌、一把转椅和一个书架。书桌上有一台笔记本电脑、一盏台灯、一本葡汉词典和几本书。我的房间没有阳台。" }
          ]
        },
        {
          section: "Texto II · 谈论中国大学的上床下桌宿舍",
          lines: [
            { speaker: "Mário", pt: "Na China, tu moras em casa ou no dormitório da Universidade? E como é o dormitório?", zh: "在中国，你住家里还是大学宿舍？宿舍怎么样？" },
            { speaker: "Lin Xiao", pt: "Moro na Universidade. É espaçoso. É um apartamento com casa de banho privativa. Somos quatro.", zh: "我住学校。很宽敞，是带独立卫生间的公寓。我们四个人住。" },
            { speaker: "Mário", pt: "E o que é que vocês têm no dormitório? Onde é que vocês guardam as coisas?", zh: "你们宿舍里有什么？东西都收在哪儿？" },
            { speaker: "Lin Xiao", pt: "Na verdade, as camas são conjuntos de cama, secretária, estante e armário: a cama fica em cima e o resto fica em baixo. Assim, não só podemos dormir, como também temos espaço para estudar e para guardar as coisas.", zh: "其实，床是集床铺、书桌、书架和衣柜于一体的组合家具：床在上面，其余在下面（上床下桌）。这样我们不仅可以睡觉，还有空间学习和收纳物品。" },
            { speaker: "Mário / Lin Xiao", pt: "Que giro! E têm televisor no dormitório? — Não, mas podemos ver televisão na Internet, porque temos banda larga no dormitório.", zh: "太酷了！宿舍里有电视吗？— 没有，但我们可以在网上看电视，因为宿舍有宽带。" }
          ]
        }
      ],
      vocab: [
        { pt: "sala de estar / sala de jantar / quarto", pos: "房间", zh: "客厅 / 餐厅 / 卧室" },
        { pt: "cozinha / casa de banho / varanda", pos: "房间", zh: "厨房 / 卫生间、浴室 / 阳台" },
        { pt: "sofá / mesa de cabeceira / guarda-roupa / estante", pos: "家具", zh: "沙发 / 床头柜 / 衣柜 / 书架" },
        { pt: "computador portátil / candeeiro / banda larga", pos: "物品", zh: "笔记本电脑 / 台灯、灯具 / 宽带" },
        { pt: "em frente de / ao lado de / em cima de", pos: "方位", zh: "在……对面 / 在……旁边 / 在……上面" },
        { pt: "além de / não só ... como também ...", pos: "连词", zh: "除了……之外 / 不仅……而且……" },
        { pt: "andar / espaçoso / Que giro!", pos: "常用", zh: "楼层 / 宽敞的 / 真棒！真好看！" }
      ]
    },
    {
      id: "u10",
      badge: "Unidade 10",
      titlePt: "O dia-a-dia na universidade",
      titleZh: "大学的日常生活",
      bookPages: [152, 174],
      pdfPages: [165, 187],
      sections: [
        { label: "单元导览", pdfPage: 165 },
        { label: "课文词汇", pdfPage: 166 },
        { label: "语法讲解", pdfPage: 170 },
        { label: "课后练习", pdfPage: 178 }
      ],
      tracks: [
        { id: 387273382, type: "texto", label: "第10课 课文 (Texto)", duration: 150, file: "audio/387273382.mp3", jumpPage: 166 },
        { id: 387273276, type: "vocab", label: "第10课 单词 (Vocabulário)", duration: 157, file: "audio/387273276.mp3", jumpPage: 167 }
      ],
      grammarPoints: [
        "反身动词（代词式动词）变位：levantar-se（起床）、lavar-se（洗漱）、arranjar-se（梳洗打扮）、deitar-se（上床睡觉）、divertir-se（娱乐）",
        "钟点表达法：às 8:00 (às oito horas), às 7h30 (às sete e meia), ao meio-dia（中午12点）, em ponto（整点）",
        "星期的表达：domingo（周日）, segunda-feira（周一）至 sexta-feira（周五）, sábado（周六）",
        "习惯性动作：costumar + 动词不定式（通常/习惯做某事）"
      ],
      dialogues: [
        {
          section: "Texto I & II · 询问上下课时间与周五晚安排",
          lines: [
            { speaker: "Mário / Lúcia", pt: "A que horas começam as aulas? — Começam às 8:00 horas. — E a que horas terminam? — Ao meio-dia.", zh: "几点开始上课？— 8 点开始。— 几点结束？— 中午 12 点。" },
            { speaker: "João", pt: "Hoje é sexta-feira, não é? Então, hoje à noite já podemos ir divertir-nos a um bar. O que achas?", zh: "今天是星期五，对吧？那么今晚我们可以去酒吧放松一下了。你觉得怎么样？" },
            { speaker: "Afonso", pt: "Acho óptimo. Amanhã não precisamos de nos levantar cedo e podemos dormir até à hora do almoço! — Exacto!", zh: "我觉得太棒了。明天我们不需要早起，可以一直睡到午饭时间！— 没错！" }
          ]
        },
        {
          section: "Texto III · 小梅在大学的日常生活 (A vida quotidiana da Xiao Mei)",
          lines: [
            { speaker: "早晨与上午", pt: "De manhã, a Xiao Mei levanta-se às 7h00. Como elas são quatro e no dormitório só há uma casa de banho, a Xiao Mei lava-se e arranja-se depressa. Às 7h30, ela sai do dormitório e vai tomar o pequeno-almoço na cantina. Normalmente ela come um baozi, um ovo cozido e uma sopa de arroz. Depois, ela vai directamente para a sala de aula. As aulas começam às 8h00 em ponto. De segunda a sexta-feira, de manhã ela tem normalmente quatro horas de Português, das oito até ao meio-dia. Ela almoça também na cantina. Depois do almoço, ela dorme uma sesta.", zh: "早上小梅 7 点起床。因为寝室四个人只有一个卫生间，她快速洗漱收拾。7 点半离开宿舍去食堂吃早饭，通常吃一个包子、一个水煮蛋和一碗米粥。然后直接去教室。8 点整上课。周一到周五上午通常有四节葡语课，从 8 点上到中午 12 点。她在食堂吃午饭，午饭后睡个午觉。" },
            { speaker: "下午与晚上", pt: "À tarde, ela não tem aulas de Português, mas tem as outras disciplinas obrigatórias e opcionais. Quando não tem aulas, ela vai estudar na biblioteca. Das 16h00 às 17h00, é a hora de fazer desporto e a Xiao Mei costuma jogar ténis de mesa com as colegas. O jantar é às 17h30. Depois do jantar, primeiro vai passear pelo campus com as colegas e depois vai estudar na sala de aula ou na biblioteca. Ela volta para o dormitório por volta das 21h30. Ela deita-se às 23h00.", zh: "下午她没有葡语课，但有其他必修课和选修课。没课时去图书馆自习。16 点到 17 点是运动时间，她常和同学打乒乓球。17 点半吃晚饭。晚饭后先在校园散步，再去教室或图书馆学习。大约 21 点半回宿舍，聊会儿天看会儿电视，23 点睡觉。" }
          ]
        }
      ],
      vocab: [
        { pt: "levantar-se / lavar-se / arranjar-se / deitar-se", pos: "v. refl.", zh: "起床 / 洗漱 / 梳洗收拾 / 上床睡觉" },
        { pt: "pequeno-almoço / almoço / jantar / sesta", pos: "m. / f.", zh: "早餐 / 午餐 / 晚餐 / 午觉 (dormir uma sesta)" },
        { pt: "começar / terminar / sair / voltar", pos: "v.", zh: "开始 / 结束 / 离开、出去 / 返回" },
        { pt: "costumar (+ inf.) / precisar de (+ inf.)", pos: "v.", zh: "通常、习惯做…… / 需要做……" },
        { pt: "disciplina (obrigatória / opcional)", pos: "f.", zh: "课程、科目（必修的 / 选修的）" },
        { pt: "cantina / biblioteca / campus", pos: "名", zh: "食堂 (f.) / 图书馆 (f.) / 校园 (m.)" },
        { pt: "em ponto / por volta de / depressa / cedo", pos: "副词短语", zh: "整点 / 大约（时间） / 快速地 / 早" }
      ]
    },
    {
      id: "teste2",
      badge: "Teste 2",
      titlePt: "Teste de Revisão 2 (Unidades 6–10)",
      titleZh: "阶段测验 2（第 6～10 课综合复习）",
      bookPages: [175, 179],
      pdfPages: [188, 192],
      sections: [
        { label: "测验第1页", pdfPage: 188 },
        { label: "测验第2页", pdfPage: 189 },
        { label: "测验第3页", pdfPage: 190 },
        { label: "测验第4页", pdfPage: 191 },
        { label: "测验第5页", pdfPage: 192 }
      ],
      tracks: [],
      grammarPoints: [
        "涵盖第 6～10 单元：数字、钟点、星期、反身动词、比较级、无人称动词 há 及日常起居综合自测。",
        "可切换至「原书扫描」模式直接做题。"
      ],
      dialogues: [],
      vocab: []
    },
    {
      id: "u11",
      badge: "Unidade 11",
      titlePt: "Porque é que estudas português?",
      titleZh: "你为什么学葡语？",
      bookPages: [180, 197],
      pdfPages: [193, 210],
      sections: [
        { label: "单元导览", pdfPage: 193 },
        { label: "课文词汇", pdfPage: 194 },
        { label: "语法讲解", pdfPage: 198 },
        { label: "课后练习", pdfPage: 203 }
      ],
      tracks: [
        { id: 387273621, type: "texto", label: "第11课 课文 (Texto)", duration: 132, file: "audio/387273621.mp3", jumpPage: 194 },
        { id: 387273476, type: "vocab", label: "第11课 单词 (Vocabulário)", duration: 222, file: "audio/387273476.mp3", jumpPage: 195 }
      ],
      grammarPoints: [
        "不规则动词 dar（给、授课：dou, dás, dá, damos, dão）与 preferir（更喜欢：prefiro, preferes, prefere...）",
        "重读宾格人称代词（置于前置词 para, de, com 等之后）：mim, ti, si, ele/ela, nós, vocês, eles/elas",
        "委婉表达愿望：Eu gostava de + inf.（原本是过去未完成时，口语中常用于礼貌表达“我很想……”）",
        "enquanto (que) 表示对比：“而，然而”"
      ],
      dialogues: [
        {
          section: "Texto I · 为什么选择学葡萄牙语？",
          lines: [
            { speaker: "Leitor", pt: "Porque é que estudas português?", zh: "你为什么学习葡萄牙语？" },
            { speaker: "Xiao Mei", pt: "Porque eu gosto de línguas estrangeiras. E como já falo inglês, eu gostava de aprender uma outra língua estrangeira.", zh: "因为我喜欢外语。而且既然我已经会说英语了，我很想再学一门别的外语。" },
            { speaker: "Leitor", pt: "E porquê o português?", zh: "那为什么是葡萄牙语呢？" },
            { speaker: "Xiao Mei", pt: "Porque o português é neste momento muito procurado na China e é possível arranjar bom emprego com ele.", zh: "因为目前葡萄牙语在中国非常吃香（紧缺），学好它有可能找到一份好工作。" },
            { speaker: "Leitor", pt: "E para ti, o que é um bom emprego?", zh: "那么对你来说，什么样的工作才算好工作？" },
            { speaker: "Xiao Mei", pt: "Não sei muito bem, porque ainda é muito cedo para mim pensar nisto. Mas penso que um bom emprego tem que ser, pelo menos, interessante e bem pago.", zh: "我还不完全清楚，因为对我来说考虑这个还太早。但我认为一份好工作至少得是有趣且薪水丰厚的。" },
            { speaker: "Leitor / Xiao Mei", pt: "E preferes trabalhar numa empresa ou no governo? — Eu prefiro trabalhar numa empresa. Acho que é mais interessante.", zh: "那你更愿意在企业工作还是在政府工作？— 我更喜欢在企业工作，我觉得更有意思。" }
          ]
        },
        {
          section: "Texto II · O estudo de português（葡语专业的课程与文化学习）",
          lines: [
            { speaker: "课程分工", pt: "Nos dias úteis, temos aulas de português todos os dias. Os nossos três professores – dois chineses e um português – leccionam disciplinas diferentes. Os professores chineses dão as aulas de Língua, Gramática, Leitura Extensiva e Laboratório enquanto que o professor português ensina a disciplina de Conversação.", zh: "在工作日，我们每天都有葡语课。我们的三位老师（两位中教、一位外教）教授不同的科目。中国老师上精读（语言）、语法、泛读和视听说课，而葡萄牙外教则教会话课。" },
            { speaker: "口语与文化", pt: "Aqui, a oralidade é tão importante como a escrita. Por isso, para além de memorizar as palavras e as regras gramaticais, temos que praticar muito a oralidade. Além da língua, também estudamos a cultura dos países de língua oficial portuguesa. Os oito países lusófonos ficam em continentes diferentes – na Europa, em África, na América do Sul e na Ásia.", zh: "在大学里，口语和书面语同样重要。因此除了记忆单词和语法规则外，还必须大量练习口语。除了语言，我们也学习葡语国家的文化。八个葡语国家分布在欧洲、非洲、南美洲和亚洲等不同大洲。" }
          ]
        }
      ],
      vocab: [
        { pt: "procurado / emprego / bem pago", pos: "职场", zh: "吃香的、受欢迎的 / 工作、职位 / 薪水高的" },
        { pt: "arranjar / preferir / dar / leccionar", pos: "v.", zh: "找到、谋得 / 更喜欢 (prefiro) / 给、授课 / 任教" },
        { pt: "Conversação / Leitura Extensiva / Laboratório", pos: "课程", zh: "会话课 / 泛读课 / 语音室（视听说课）" },
        { pt: "oralidade / escrita / memorizar / praticar", pos: "学习", zh: "口语表达 / 书面写作 / 记忆、背诵 / 练习" },
        { pt: "lusófono / continente / cultura", pos: "文化", zh: "说葡语的（os países lusófonos 葡语国家） / 大洲 / 文化" },
        { pt: "pelo menos / de acordo com / enquanto que", pos: "短语", zh: "至少 / 根据…… / 而（表对比）" }
      ]
    },
    {
      id: "u12",
      badge: "Unidade 12",
      titlePt: "O que é que fizeste ontem?",
      titleZh: "你昨天做什么了？",
      bookPages: [198, 219],
      pdfPages: [211, 232],
      sections: [
        { label: "单元导览", pdfPage: 211 },
        { label: "课文词汇", pdfPage: 212 },
        { label: "语法讲解", pdfPage: 217 },
        { label: "课后练习", pdfPage: 224 }
      ],
      tracks: [
        { id: 387273962, type: "texto", label: "第12课 课文 (Texto)", duration: 143, file: "audio/387273962.mp3", jumpPage: 212 },
        { id: 387273852, type: "vocab", label: "第12课 单词 (Vocabulário)", duration: 124, file: "audio/387273852.mp3", jumpPage: 213 }
      ],
      grammarPoints: [
        "陈述式简单过去完成时（PPS，表示过去已完成的动作）：规则动词 -ar (-ei, -aste, -ou, -ámos, -aram), -er (-i, -este, -eu...), -ir (-i, -iste, -iu...)",
        "核心不规则动词 PPS：ser/ir (fui, foste, foi, fomos, foram), fazer (fiz, fizeste, fez...), estar (estive...), ter (tive...), ver (vi, viste, viu...)",
        "非重读直接宾格代词：me, te, o/a, nos, vos, os/as（如：Convido-te 我邀请你）",
        "há + 时间段：表示“已经有……时间了”（Já há muito tempo que não vou ao cinema）"
      ],
      dialogues: [
        {
          section: "Texto I & II · 邀约看电影与共进晚餐",
          lines: [
            { speaker: "Gabriela / Ana", pt: "Vamos ao cinema. Queres vir? — Boa ideia. Vamos.", zh: "我们去电影院吧。你想来吗？— 好主意，走吧。" },
            { speaker: "Francisco", pt: "Posso convidar-te para jantar hoje à noite?", zh: "今晚我可以请你吃晚饭吗？" },
            { speaker: "Gabriela", pt: "Gostava muito de ir. Mas, peço desculpa, pois tenho que preparar o exame de amanhã.", zh: "我很想去。但很抱歉，因为我得准备明天的考试。" },
            { speaker: "Francisco", pt: "Está bem. Convido-te outro dia.", zh: "好吧。我改天再请你。" }
          ]
        },
        {
          section: "Texto III · 聊上周末怎么过的（海滩、上城区酒吧与电影）",
          lines: [
            { speaker: "Mário", pt: "Então, o que é que fizeste no fim-de-semana?", zh: "那么，你周末都做什么了？" },
            { speaker: "Lin Xiao", pt: "Nada de especial. No sábado fui jogar futebol com outros estudantes chineses e ontem fiquei a estudar e a navegar na Internet no meu quarto durante o dia todo. Nem saí de casa.", zh: "没什么特别的。周六我和别的中国学生去踢球了，昨天我一整天都待在房间里学习和上网，连门都没出。" },
            { speaker: "Mário", pt: "A estudar ao domingo?! És realmente muito estudioso! Preciso de aprender contigo!", zh: "周日还在学习？！你真的太用功了！我得向你学习！" },
            { speaker: "Lin Xiao", pt: "Não estejas aí a gozar comigo! E tu, o que é que fizeste?", zh: "你别在那儿拿我开玩笑了！你呢，你干什么了？" },
            { speaker: "Mário", pt: "Diverti-me. Passei todo o fim-de-semana com a minha namorada. No sábado, fomos à praia de Carcavelos e ficámos lá o dia todo. Estás a ver, estou mesmo bronzeado. E à noite fomos a um bar aqui em Lisboa, no Bairro Alto. Depois, no domingo, de manhã fiquei a descansar em casa e à tarde fomos ao cinema.", zh: "我玩得很开心。整个周末都和女朋友在一起。周六我们去了卡卡维洛斯海滩，在那儿待了一整天。你看，我都晒成古铜色了。晚上去了里斯本上城区（Bairro Alto）的一家酒吧。周日上午在家休息，下午去看了电影。" },
            { speaker: "Lin Xiao / Mário", pt: "E que filme é que viram? — Um filme americano sobre a Segunda Guerra Mundial. Eu adorei, mas ela gosta mais de filmes românticos. — Também gosto de filmes de guerra, de acção, de comédias e de ficção científica.", zh: "你们看了什么电影？— 一部关于二战的美国电影。我超喜欢，但她更喜欢爱情片。— 我也喜欢战争片、动作片、喜剧片和科幻片。" }
          ]
        }
      ],
      vocab: [
        { pt: "convidar / preparar / passar / adorar", pos: "v.", zh: "邀请 / 准备 / 度过 / 非常喜欢" },
        { pt: "fim-de-semana / praia / bronzeado", pos: "周末", zh: "周末 / 海滩 (f.) / 晒成古铜色的" },
        { pt: "navegar na Internet / gozar com", pos: "短语", zh: "上网冲浪 / 开某人的玩笑、打趣" },
        { pt: "filme (romântico / de acção / de ficção científica)", pos: "电影", zh: "电影（爱情片 / 动作片 / 科幻片）" },
        { pt: "comédia / Segunda Guerra Mundial", pos: "f.", zh: "喜剧 / 第二次世界大战" },
        { pt: "Peço desculpa. / Nada de especial.", pos: "日常", zh: "我请求原谅（很抱歉）。 / 没什么特别的。" }
      ]
    },
    {
      id: "u13",
      badge: "Unidade 13",
      titlePt: "Hoje a temperatura desceu muito!",
      titleZh: "今天气温下降了很多啊！",
      bookPages: [220, 239],
      pdfPages: [233, 252],
      sections: [
        { label: "单元导览", pdfPage: 233 },
        { label: "课文词汇", pdfPage: 234 },
        { label: "语法讲解", pdfPage: 239 },
        { label: "课后练习", pdfPage: 244 }
      ],
      tracks: [
        { id: 387274253, type: "texto", label: "第13课 课文 (Texto)", duration: 196, file: "audio/387274253.mp3", jumpPage: 234 },
        { id: 387274149, type: "vocab", label: "第13课 单词 (Vocabulário)", duration: 170, file: "audio/387274149.mp3", jumpPage: 236 }
      ],
      grammarPoints: [
        "天气表达法：fazer + 天气名词（Faz sol / Faz vento / Fez frio）；estar + 天气状态（Está bom tempo / O céu está nublado）；自然现象无人称动词 chover（下雨）、nevar（下雪）",
        "形容词相对最高级：o/a mais + adj. + de...（……中最……的，如：a estação mais bonita de todas）",
        "四季与方位：Primavera（春）, Verão（夏）, Outono（秋）, Inverno（冬）；Norte（北）, Sul（南）, Este/Leste（东）, Oeste（西）"
      ],
      dialogues: [
        {
          section: "Texto I & II · 天气预报与天气突变",
          lines: [
            { speaker: "A / B", pt: "Como vai estar o tempo hoje? — Segundo o boletim meteorológico, hoje vai estar bom tempo. Faz sol.", zh: "今天天气会怎么样？— 根据天气预报，今天会是好天气。出太阳。" },
            { speaker: "A / B", pt: "Ontem ainda fez sol e hoje está um tempo tão mau! — Pois está. O céu está nublado e faz vento. Parece que vai chover.", zh: "昨天还艳阳高照，今天天气却这么糟！— 可不是嘛。天空阴云密布而且刮风，看起来要下雨了。" }
          ]
        },
        {
          section: "Texto III · 南北方过冬与暖气对比",
          lines: [
            { speaker: "Lúcia / Óscar", pt: "Hoje a temperatura desceu muito! — Pois desceu! E está um frio... — Estamos realmente no Inverno!", zh: "今天气温降了好多！— 是啊！而且真冷啊…… — 我们真的进入冬天了！" },
            { speaker: "Óscar", pt: "Mas na minha terra natal, no Sul, a temperatura nesta altura ainda está relativamente alta.", zh: "但在我的老家南方，这个时候气温还相对较高。" },
            { speaker: "Lúcia", pt: "Pois é. Mas aqui no Norte o Inverno é muito mais frio do que no Sul. Nos dias mais frios, a temperatura mínima pode descer até aos -20 °C (vinte graus negativos)! Mas como temos aquecimento em casa, nem sentimos o frio!", zh: "是啊。但北方冬天比南方冷得多。最冷的几天最低气温能降到零下 20 度！不过因为家里有暖气，我们甚至感觉不到冷！" },
            { speaker: "Óscar", pt: "Ainda bem! Mas o aquecimento também traz problemas. O ar fica muito seco em casa! E estes dias estou com muitas dores de garganta.", zh: "那就好！但暖气也带来问题，屋里空气变得非常干燥！这几天我嗓子很疼。" },
            { speaker: "Lúcia", pt: "Mas ouvi dizer que o Inverno no Sul é até mais difícil de aguentar, porque vocês não usam aquecimento. Olha, o céu está escuro. Parece que vai nevar!", zh: "但我听说南方的冬天反而更难熬，因为你们不用暖气。看，天黑沉沉的，好像要下雪了！" }
          ]
        },
        {
          section: "Texto IV · 中国的气候与四季",
          lines: [
            { speaker: "地理气候", pt: "A maior parte do território chinês fica na zona temperada do Norte onde as quatro estações são distintas. De forma geral, o Verão é quente e húmido e o Inverno é frio e seco. O Outono é a estação das colheitas e também é a estação mais bonita de todas. No entanto, como a China é grande, o clima difere de região para região.", zh: "中国大部分领土位于北温带，四季分明。总体而言，夏季炎热潮湿，冬季寒冷干燥。秋天是收获的季节，也是最美的季节。然而由于中国幅员辽阔，各地气候差异很大。" }
          ]
        }
      ],
      vocab: [
        { pt: "Primavera / Verão / Outono / Inverno", pos: "四季", zh: "春天 / 夏天 / 秋天 / 冬天" },
        { pt: "sol / vento / chuva (chover) / neve (nevar)", pos: "天气", zh: "太阳 / 风 / 雨（下雨） / 雪（下雪）" },
        { pt: "quente / frio / húmido / seco / ameno", pos: "气候", zh: "热的 / 冷的 / 潮湿的 / 干燥的 / 温和宜人的" },
        { pt: "nublado / abafado / tufão", pos: "天气", zh: "多云阴天的 / 闷热的 / 台风" },
        { pt: "temperatura / grau / aquecimento", pos: "名", zh: "温度、气温 / 度（摄氏度） / 暖气、供暖" },
        { pt: "descer / aguentar / trazer", pos: "v.", zh: "下降 / 忍受、挨过 / 带来 (trago/trazes/traz)" },
        { pt: "dor de garganta / friorento", pos: "身体", zh: "嗓子疼、咽喉痛 / 怕冷的" }
      ]
    },
    {
      id: "u14",
      badge: "Unidade 14",
      titlePt: "Vamos cantar os “Parabéns a Você”?",
      titleZh: "我们来唱“祝你生日快乐”吧？",
      bookPages: [240, 257],
      pdfPages: [253, 270],
      sections: [
        { label: "单元导览", pdfPage: 253 },
        { label: "课文词汇", pdfPage: 254 },
        { label: "语法讲解", pdfPage: 260 },
        { label: "课后练习", pdfPage: 263 }
      ],
      tracks: [
        { id: 387274482, type: "texto", label: "第14课 课文 (Texto)", duration: 192, file: "audio/387274482.mp3", jumpPage: 254 },
        { id: 387274388, type: "vocab", label: "第14课 单词 (Vocabulário)", duration: 127, file: "audio/387274388.mp3", jumpPage: 256 }
      ],
      grammarPoints: [
        "非重读间接宾格代词：me, te, lhe, nos, vos, lhes（表示“给某人”，如：desejaram-lhe feliz aniversário 祝他生日快乐）",
        "副动词（gerúndio，词尾 -ando, -endo, -indo）：表示伴随或方式（enfeitando a casa 装点着房间）",
        "不定代词 alguém（某人，有人）与 ninguém（没有人）",
        "出生与过生日表达：nascer（出生，Em que ano é que nasceste?）；fazer anos（过生日，Em que dia é que fazes anos?）"
      ],
      dialogues: [
        {
          section: "Texto I & II · 询问出生年月日与生日聚会邀请",
          lines: [
            { speaker: "A / B", pt: "Em que ano é que nasceste? — Nasci em 1986. — Em que dia? — No dia 3 de Maio.", zh: "你是哪一年出生的？— 我 1986 年出生。— 哪一天？— 5 月 3 日。" },
            { speaker: "Wang Gang", pt: "Ontem foi o teu dia de aniversário?! E não disseste nada?!", zh: "昨天是你的生日？！你竟然什么都没说？！" },
            { speaker: "Li Ming", pt: "Bom, eu não costumo celebrar o meu aniversário. E tu, em que dia é que fazes anos?", zh: "唔，我通常不怎么庆祝生日。你呢，你哪天过生日？" },
            { speaker: "Wang Gang", pt: "No dia 20 de Outubro. Costumo fazer uma festa em casa. Este ano estou a pensar convidar todos os colegas da nossa turma para a festa. Tu aceitas o convite?", zh: "10 月 20 日。我通常在家里办派对。今年我打算邀请我们班所有同学来参加。你接受邀请吗？" },
            { speaker: "Li Ming / Wang Gang", pt: "Claro que aceito! E vou arranjar um presente especial para ti. — Não é preciso. A tua vinda já é o melhor presente que me podes dar. — Isso é comigo. Não te preocupes.", zh: "当然接受！而且我要给你准备一份特别的礼物。— 不用客气，你的到来就是你能给我的最好礼物了。— 那是我的事，你就别操心啦。" }
          ]
        },
        {
          section: "Texto III · 王刚的生日晚会与葡语生日歌",
          lines: [
            { speaker: "晚会开场", pt: "Ontem à noite, os colegas foram todos à festa de aniversário do Wang Gang. Os colegas primeiro desejaram-lhe feliz aniversário e ofereceram-lhe as prendas e um cartão de aniversário em que todos fizeram votos de muitas felicidades. Como o signo chinês do Wang Gang é o Porco, o Li Ming ofereceu-lhe um porco de madeira muito giro de que o Wang Gang gostou imenso.", zh: "昨晚同学们都去了王刚的生日晚会。大家首先祝他生日快乐，并送给他礼物和写满祝福的生日贺卡。因为王刚属猪，李明送了他一只非常可爱的木头小猪，王刚喜欢极了。" },
            { speaker: "吹蜡烛与生日歌", pt: "O Wang Gang colocou as velas no bolo e acendeu-as. Um colega apagou a luz e todos começaram a cantar: “Parabéns a você, / Nesta data querida. / Muitas felicidades, / Muitos anos de vida. / Hoje é dia de festa, / Cantam as nossas almas. / Para o menino Wang Gang, / Uma salva de palmas.” Em seguida, o Wang Gang fez um pedido em silêncio e apagou as velas de um sopro.", zh: "王刚把蜡烛插在蛋糕上并点燃。一位同学关了灯，大家开始唱葡语生日歌：“祝你生日快乐，在这个亲切的日子里，祝你幸福美满，长命百岁。今天是欢庆的日子，我们的心灵在歌唱，献给男孩王刚，一阵热烈的掌声。”随后王刚默默许了个愿，一口气吹灭了蜡烛。" }
          ]
        }
      ],
      vocab: [
        { pt: "nascer / fazer anos / celebrar", pos: "生日", zh: "出生 (nasci/nasceste) / 过生日 / 庆祝" },
        { pt: "aniversário / festa / convite", pos: "名", zh: "生日 (m.) / 聚会、派对 (f.) / 邀请 (m.)" },
        { pt: "presente / prenda / cartão de aniversário", pos: "礼物", zh: "礼物 (m.) / 礼物 (f.) / 生日贺卡 (m.)" },
        { pt: "bolo / vela / acender / apagar", pos: "庆生", zh: "蛋糕 / 蜡烛 / 点燃 / 吹灭、关灯" },
        { pt: "fazer um pedido / de um sopro", pos: "短语", zh: "许愿 / 一口气（吹灭）" },
        { pt: "signo chinês / uma salva de palmas", pos: "文化", zh: "中国生肖 / 一阵掌声" },
        { pt: "despedir-se (de) / Não te preocupes.", pos: "常用", zh: "向……告别 / 你别担心、不用操心。" }
      ]
    },
    {
      id: "teste3",
      badge: "Teste 3",
      titlePt: "Teste de Revisão 3 & Vocabulário Geral",
      titleZh: "阶段测验 3 与全书总词汇表",
      bookPages: [258, 298],
      pdfPages: [271, 311],
      sections: [
        { label: "测验 3 (Teste 3)", pdfPage: 271 },
        { label: "总词汇表 A-C", pdfPage: 275 },
        { label: "总词汇表 D-L", pdfPage: 283 },
        { label: "总词汇表 M-P", pdfPage: 293 },
        { label: "总词汇表 Q-Z", pdfPage: 303 }
      ],
      tracks: [],
      grammarPoints: [
        "本部分包含第 11～14 课综合测验（Teste 3，PDF 第 271–274 页）以及全书葡汉总词汇表（PDF 第 275–311 页）。",
        "点击上方快捷页签或切换到「原书扫描」模式即可快速翻阅总词汇表。"
      ],
      dialogues: [],
      vocab: []
    }
  ]
};

// 🇵🇹 欧洲葡语 (pt-PT) vs 🇧🇷 巴西葡语 (pt-BR) 全书语音、词汇、句法与跨文化避坑对比库
window.PT_BR_DATA = {
  phoneticsOverview: [
    {
      rule: "词尾及非重读元音 e / o",
      pt: "读音极短促闭口：-e 读 [ɨ]（常听感近似吞音），-o 读 [u]",
      br: "发音清晰饱满：词尾 -e 读 [i]，词尾 -o 读 [u]，绝不吞音",
      examplePt: "tarde [ˈtardɨ] · estudante [ʃtuˈdɐ̃tɨ]",
      exampleBr: "tarde [ˈtardʒi] · estudante [istuˈdɐ̃tʃi]",
      sampleWordPt: "Boa tarde, estudante.",
      sampleWordBr: "Boa tarde, estudante."
    },
    {
      rule: "辅音 t / d 在元音 e / i 前（颚化现象）",
      pt: "保持舌尖齿龈塞音 [t] 和 [d]，不发生颚化",
      br: "发生强烈颚化：ti/te 读作 [tʃi]（如“奇”），di/de 读作 [dʒi]（如“吉”）",
      examplePt: "Bom dia [bõ ˈdiɐ] · de [dɨ] · noite [ˈnojtɨ]",
      exampleBr: "Bom dia [bõ ˈdʒiɐ] · de [dʒi] · noite [ˈnojtʃi]",
      sampleWordPt: "Bom dia! De onde és?",
      sampleWordBr: "Bom dia! De onde você é?"
    },
    {
      rule: "音节尾及词尾的 s / z（翘舌音 vs 平舌音）",
      pt: "一律读翘舌摩擦音 [ʃ] 或浊音 [ʒ]（听感充满“sh”沙沙声）",
      br: "圣保罗/巴西南方主流读平舌 [s] / [z]（仅里约口音读 [ʃ]）",
      examplePt: "português [purtuˈɣeʃ] · estás [ʃˈtaʃ] · dois [dojʃ]",
      exampleBr: "português [portuˈɡes] · está [isˈta] · dois [dojs]",
      sampleWordPt: "Falas português?",
      sampleWordBr: "Você fala português?"
    },
    {
      rule: "词尾辅音 l（舌边音 vs 半元音化）",
      pt: "保留舌尖抵上齿龈的暗 l 音 [ɫ]",
      br: "完全元音化为 [w]（所以 Brasil 听起来像 Braziu，papel 像 papéu）",
      examplePt: "Brasil [brɐˈziɫ] · jornal [ʒurˈnaɫ]",
      exampleBr: "Brasil [braˈziw] · jornal [ʒorˈnaw]",
      sampleWordPt: "Sou do Brasil.",
      sampleWordBr: "Eu sou do Brasil."
    },
    {
      rule: "鼻音前的重读 e / o（开音 vs 闭音）",
      pt: "保留开口度对比：gémeos [ˈʒɛmjuʃ]、ténis [ˈtɛniʃ] 用尖音符表开音",
      br: "一律闭化并鼻化：gêmeos [ˈʒẽmjus]、tênis [ˈtẽnis] 用抑扬符 ^",
      examplePt: "gémeos · ténis de mesa · António",
      exampleBr: "gêmeos · tênis de mesa · Antônio",
      sampleWordPt: "O António joga ténis de mesa.",
      sampleWordBr: "O Antônio joga tênis de mesa."
    }
  ],

  // 词汇表词条自动匹配巴葡对照 (key 为课本 vocab.pt 子串或完整词)
  vocabBrMap: {
    "chamar-se": { br: "chamar-se (Eu me chamo...)", note: "巴葡代词置动词前：Eu me chamo / Como você se chama?" },
    "donde": { br: "de onde", note: "巴葡日常口语几乎分开写为 de onde" },
    "tu / ela": { br: "você / ela", note: "巴西绝大部分地区日常对朋友/同辈用 você 代替 tu" },
    "óptimo / óptima": { br: "ótimo / ótima", note: "巴葡及新正字法去掉不发音的字母 p" },
    "moço / moça": { br: "garoto / garota / moço / moça", note: "巴葡日常更常说 garoto/garota 或 menino/menina" },
    "estar a + inf.": { br: "estar + 副动词 (-ndo)", note: "如：🇵🇹 estou a estudar vs 🇧🇷 estou estudando" },
    "loiro / moreno / negro": { br: "loiro (louro) / moreno / negro", note: "巴葡中 loiro 与 louro 均常用" },
    "cara (oval / comprida / redonda)": { br: "rosto (oval / comprido / redondo)", note: "巴葡描述面容更倾向用 o rosto，cara 偏口语" },
    "leitor / aula / aluno": { br: "professor visitante / aula / aluno", note: "葡葡 leitor 专指大学语言外教" },
    "branco / preto / cinzento / escuro": { br: "branco / preto / cinza / escuro", note: "灰色：🇵🇹 cinzento vs 🇧🇷 cinza" },
    "camisa / blusa / camisola / casaco": { br: "camisa / blusa / suéter (blusa de frio) / casaco", note: "⚠️ 巴葡中 camisola 指“女士睡裙”，毛衣说 suéter！" },
    "fato / vestido / saia / calças": { br: "terno / vestido / saia / calça", note: "西装：🇵🇹 fato vs 🇧🇷 terno；裤子巴葡常单数 a calça" },
    "rapariga / rapaz": { br: "menina (garota) / rapaz (garoto)", note: "⚠️ 避坑：rapariga 在巴西部分地区有贬义，巴葡请用 menina/garota！" },
    "telefone fixo / telemóvel": { br: "telefone fixo / celular", note: "手机：🇵🇹 o telemóvel vs 🇧🇷 o celular" },
    "dormitório / pensão / casa": { br: "alojamento (república) / pensão / casa", note: "大学宿舍巴葡常称 alojamento estudantil 或 república" },
    "campo de jogos / sala de aula": { br: "quadra (campo) / sala de aula", note: "运动球场巴葡常称 a quadra" },
    "secretaria / secretária": { br: "secretaria / escrivaninha (书桌)", note: "书桌写字台：🇵🇹 secretária vs 🇧🇷 escrivaninha" },
    "director-geral / gerente / sócio / técnico": { br: "diretor-geral / gerente / sócio / técnico", note: "巴葡无不发音的字母 c (diretor)" },
    "Eng.º (engenheiro) / Arq.º (arquitecto)": { br: "engenheiro / arquiteto", note: "巴葡拼写为 arquiteto（去掉不发音 c）" },
    "tio / tia / neto / gémeos / filho único": { br: "tio / tia / neto / gêmeos / filho único", note: "双胞胎：🇵🇹 gémeos (开音) vs 🇧🇷 gêmeos (闭音)" },
    "trabalhos domésticos / ralhar com / bater em": { br: "tarefas domésticas / dar bronca em / bater em", note: "责备某人：🇵🇹 ralhar com vs 🇧🇷 dar uma bronca em" },
    "cozinha / casa de banho / varanda": { br: "cozinha / banheiro / varanda (sacada)", note: "卫生间：🇵🇹 a casa de banho vs 🇧🇷 o banheiro" },
    "computador portátil / candeeiro / banda larga": { br: "notebook (laptop) / abajur (luminária) / banda larga", note: "笔记本电脑：🇵🇹 portátil vs 🇧🇷 notebook；台灯：🇵🇹 candeeiro vs 🇧🇷 abajur" },
    "andar / espaçoso / Que giro!": { br: "andar / espaçoso / Que legal! (Que bacana!)", note: "真棒/真酷：🇵🇹 Que giro! vs 🇧🇷 Que legal!" },
    "pequeno-almoço / almoço / jantar / sesta": { br: "café da manhã / almoço / jantar / cochilo", note: "早餐：🇵🇹 pequeno-almoço vs 🇧🇷 café da manhã" },
    "cantina / biblioteca / campus": { br: "refeitório (bandejão) / biblioteca / campus", note: "大学食堂巴葡常叫 refeitório 或 bandejão" },
    "arranjar / preferir / dar / leccionar": { br: "conseguir (arrumar) / preferir / dar / lecionar", note: "巴葡拼写为 lecionar（单 c）" },
    "fim-de-semana / praia / bronzeado": { br: "fim de semana (final de semana) / praia / bronzeado", note: "巴葡不加连字符：fim de semana" },
    "navegar na Internet / gozar com": { br: "navegar na internet / tirar sarro de (brincar com)", note: "⚠️ 避坑：开玩笑在巴葡用 brincar com / tirar sarro，慎用 gozar！" },
    "filme (romântico / de acção / de ficção científica)": { br: "filme (romântico / de ação / de ficção científica)", note: "动作片：🇵🇹 acção vs 🇧🇷 ação" },
    "quente / frio / húmido / seco / ameno": { br: "quente / frio / úmido / seco / ameno", note: "潮湿的：🇵🇹 húmido (带 h) vs 🇧🇷 úmido (无 h)" },
    "temperatura / grau / aquecimento": { br: "temperatura / grau / aquecedor (calefação)", note: "暖气设备巴葡常称 aquecedor 或 calefação" },
    "nascer / fazer anos / celebrar": { br: "nascer / fazer aniversário / comemorar", note: "过生日：🇵🇹 fazer anos vs 🇧🇷 fazer aniversário" },
    "presente / prenda / cartão de aniversário": { br: "presente / lembrancinha / cartão de aniversário", note: "巴葡中“礼物”只用 presente，不用 prenda" }
  },

  // 各单元专属葡葡 vs 巴葡对比条目
  unitDiffs: {
    intro: [
      {
        tag: "发音规则",
        title: "齿龈音 t / d 与词尾元音 -e 的读法差异",
        pt: "Bom dia! Boa tarde! Boa noite!",
        br: "Bom dia! Boa tarde! Boa noite!",
        note: "葡葡中 d 读清晰 [d]，词尾 -e 弱化为极轻的 [ɨ]；巴葡中 dia 读 [ˈdʒiɐ]，tarde 尾音读 [ˈtardʒi]，noite 尾音读 [ˈnojtʃi]。"
      },
      {
        tag: "字母名称",
        title: "字母 K / Q / X 的称呼与尾音",
        pt: "K (capa), Q (quê), X (xis)",
        br: "K (cá), Q (quê), X (xis)",
        note: "字母 K 在葡萄牙常读作 capa，在巴西常读作 cá。"
      }
    ],
    u1: [
      {
        tag: "句型与代词",
        title: "询问对方名字（tu vs você 与代词位置）",
        pt: "Como te chamas? — Chamo-me Wang Gang.",
        br: "Como você se chama? — Eu me chamo Wang Gang.",
        note: "葡葡日常对同龄人用 tu，反身代词置于动词后并用连字符连接（chamo-me）；巴葡普遍用 você，反身代词放在动词前（me chamo），或直接问 Qual é o seu nome?"
      },
      {
        tag: "词汇缩合",
        title: "询问来自哪里（Donde vs De onde）",
        pt: "Donde é? — Sou de Pequim.",
        br: "De onde você é? — Eu sou de Pequim.",
        note: "葡葡习惯将 de + onde 缩合为 donde 且常省略主语代词；巴葡分开说 De onde，且通常保留主语 você / eu。"
      }
    ],
    u2: [
      {
        tag: "日常问候",
        title: "熟人见面问好（Estás bom/boa vs Tudo bem/bom）",
        pt: "Olá! Estás bom? / Estás boa?",
        br: "Oi! Tudo bom? / Tudo bem com você?",
        note: "葡葡对男性问 Estás bom?，对女性问 Estás boa?；巴葡最爱用 Oi!（嗨）和 Tudo bom?（男女通用，不随性别变化）。"
      },
      {
        tag: "正字拼写",
        title: "“太棒了”拼写差异（óptimo vs ótimo）",
        pt: "Estou óptimo, obrigado.",
        br: "Estou ótimo, obrigado.",
        note: "课本采用葡语旧正字法保留不发音的 p（óptimo），巴葡及 1990 新正字法写作 ótimo，两者里的 p 都不发音。"
      },
      {
        tag: "冠词习惯",
        title: "人名前是否加定冠词 o / a",
        pt: "Tu és o Nuno? Esta é a Sofia.",
        br: "Você é o Nuno? Esta é Sofia.",
        note: "葡葡在熟人名字前几乎必加定冠词 o / a；巴西南部/圣保罗也常加，但巴西东北部及正式场合常省略。"
      }
    ],
    u3: [
      {
        tag: "核心语法",
        title: "现在进行时（estar a + 动词原形 vs estar + 副动词 -ndo）",
        pt: "O que é que estão a fazer? Estão a estudar chinês.",
        br: "O que estão fazendo? Estão estudando chinês.",
        note: "这是葡葡与巴葡最著名的语法标志！葡葡用「estar a + 不定式 (a estudar)」，巴葡用「estar + 副动词 (estudando)」。"
      },
      {
        tag: "高频词汇",
        title: "小伙子与姑娘的说法",
        pt: "O moço e as moças / O rapaz e a rapariga",
        br: "O garoto e as garotas / O menino e as meninas",
        note: "巴葡日常指年轻男女最常用 garoto/garota 或 menino/menina，moço/moça 在巴西多用于礼貌招呼服务员或陌生年轻人。"
      }
    ],
    u4: [
      {
        tag: "词汇差异",
        title: "描述“脸型”与“大学外教”",
        pt: "Tem a cara oval. / O nosso leitor de português.",
        br: "Tem o rosto oval. / O nosso professor de português.",
        note: "葡葡中 cara 是完全中性的“脸”，而巴葡描述外貌更常用 o rosto（cara 在巴葡口语中还常作“家伙/老兄”讲，如 Esse cara é legal）。"
      }
    ],
    u5: [
      {
        tag: "⚠️ 跨文化避坑",
        title: "“姑娘/女孩”：rapariga 在葡巴两国的巨大反差",
        pt: "Quem é aquela rapariga de vermelho?",
        br: "Quem é aquela garota (menina) de vermelho?",
        note: "在葡萄牙，rapariga 是最纯正、最普通的“女孩子/姑娘”；但在巴西部分地区该词带有贬义（指不正经的女人），对巴西人请务必改用 menina、garota 或 moça！"
      },
      {
        tag: "⚠️ 同词异义",
        title: "衣着词汇大不同：camisola、fato 与 equipa",
        pt: "Uma camisola cor-de-rosa, um fato escuro e a equipa de futebol.",
        br: "Um suéter rosa, um terno escuro e o time de futebol.",
        note: "① 葡葡 camisola 是“毛衣/套头衫”，而在巴葡中 camisola 是“女士吊带睡裙”（毛衣叫 suéter / blusa de frio）！② 西装：葡葡 fato vs 巴葡 terno；③ 足球队：葡葡 a equipa vs 巴葡 o time。"
      },
      {
        tag: "颜色词汇",
        title: "灰色与棕色的不同用词",
        pt: "Este casaco é cinzento e os sapatos são castanhos.",
        br: "Este casaco é cinza e os sapatos são marrons.",
        note: "灰色：葡葡 cinzento vs 巴葡 cinza；棕色：葡葡 castanho vs 巴葡 marrom（但指眼睛/头发褐色时两国都可用 castanho）。"
      }
    ],
    u6: [
      {
        tag: "高频词汇",
        title: "“手机”与“书桌”：telemóvel vs celular",
        pt: "Qual é o número do teu telemóvel?",
        br: "Qual é o número do seu celular?",
        note: "手机在葡萄牙叫 o telemóvel（号码以 9 开头，共 9 位），在巴西叫 o celular！"
      },
      {
        tag: "校园词汇",
        title: "大学宿舍与球场",
        pt: "Moro no dormitório. Estão no campo de jogos.",
        br: "Moro no alojamento (na república). Estão na quadra.",
        note: "巴西大学生合租宿舍常称作 república，学校宿舍称 alojamento；运动场常称 quadra。"
      }
    ],
    u7: [
      {
        tag: "正字拼写",
        title: "不发音辅音字母 c 的去留（director / arquitecto）",
        pt: "O director-geral e a arquitecta.",
        br: "O diretor-geral e a arquiteta.",
        note: "课本遵循旧葡葡拼写保留 c（director, arquitecto），巴葡写作 diretor, arquiteto；注意两者的 c 都不发音。"
      }
    ],
    u8: [
      {
        tag: "重音与发音",
        title: "双胞胎（gémeos vs gêmeos）与日常责备",
        pt: "Somos gémeos. Os pais ralham com ele.",
        br: "Somos gêmeos. Os pais dão uma bronca nele.",
        note: "葡葡用尖音符 gémeos（读开音 [ɛ]），巴葡用抑扬符 gêmeos（读闭音 [ẽ]）。“训斥/责备”葡葡常用 ralhar com，巴葡口语常说 dar uma bronca em。"
      }
    ],
    u9: [
      {
        tag: "高频生活词",
        title: "卫生间、笔记本电脑、书桌与台灯（四大高频差异词）",
        pt: "Na casa de banho · um computador portátil na secretária · um candeeiro.",
        br: "No banheiro · um notebook na escrivaninha · um abajur.",
        note: "卫生间：🇵🇹 casa de banho vs 🇧🇷 banheiro；笔记本电脑：🇵🇹 portátil vs 🇧🇷 notebook；书桌：🇵🇹 secretária vs 🇧🇷 escrivaninha；台灯：🇵🇹 candeeiro vs 🇧🇷 abajur。"
      },
      {
        tag: "口语感叹与存在句",
        title: "“太酷了！”（Que giro vs Que legal）与存在句（há vs tem）",
        pt: "Que giro! Na sala de estar há três sofás.",
        br: "Que legal! Na sala de estar tem três sofás.",
        note: "葡葡口语夸赞“真酷/真棒/真可爱”最爱用 Que giro! 或 Fixe!；巴葡最经典的是 Que legal! 或 Que bacana! 此外巴葡口语常用 tem 代替无人称动词 há。"
      }
    ],
    u10: [
      {
        tag: "餐饮与运动",
        title: "早餐、食堂、运动与乒乓球",
        pt: "Tomar o pequeno-almoço na cantina e fazer desporto (ténis de mesa).",
        br: "Tomar o café da manhã no refeitório e praticar esporte (tênis de mesa).",
        note: "早餐：🇵🇹 pequeno-almoço vs 🇧🇷 café da manhã；体育运动：🇵🇹 desporto vs 🇧🇷 esporte；乒乓球：🇵🇹 ténis de mesa vs 🇧🇷 tênis de mesa / pingue-pongue。"
      }
    ],
    u11: [
      {
        tag: "语法与拼写",
        title: "委婉愿望（gostava vs gostaria）与授课（leccionar vs lecionar）",
        pt: "Eu gostava de aprender outra língua. Os professores leccionam.",
        br: "Eu gostaria de aprender outra língua. Os professores lecionam.",
        note: "葡葡口语习惯用过去未完成时（Eu gostava de...）表达礼貌愿望，而巴葡多用条件式（Eu gostaria de...）。"
      }
    ],
    u12: [
      {
        tag: "⚠️ 跨文化避坑",
        title: "“开玩笑/逗某人”：gozar com vs brincar com / tirar sarro",
        pt: "Não estejas aí a gozar comigo!",
        br: "Não fique aí tirando sarro de mim! (Não brinque comigo!)",
        note: "在葡萄牙 gozar com alguém 是完全正常的“拿某人开玩笑/打趣”；但在巴西口语中 gozar 极易引发性暗示歧义，对巴西人请用 brincar com 或 tirar sarro de！"
      },
      {
        tag: "动词变位与代词",
        title: "过去时第一人称复数重音（ficámos vs ficamos）与宾格位置",
        pt: "Ontem ficámos lá o dia todo. Convido-te para jantar.",
        br: "Ontem ficamos lá o dia todo. Eu te convido para jantar.",
        note: "葡葡为了区分现在时（ficamos）与过去完成时（ficámos），在过去时加开音重音符 á；巴葡两者拼写与读音完全相同（均写为 ficamos）。"
      }
    ],
    u13: [
      {
        tag: "拼写与气候",
        title: "“潮湿的”（húmido vs úmido）与暖气",
        pt: "O Verão é quente e húmido. Temos aquecimento em casa.",
        br: "O verão é quente e úmido. Temos aquecedor em casa.",
        note: "“潮湿的”在葡葡中保留首字母 h（húmido），在巴葡中无 h（úmido）；此外四季名称在葡葡旧正字法中首字母大写（Verão, Inverno），巴葡小写。"
      }
    ],
    u14: [
      {
        tag: "文化与词汇",
        title: "“过生日”（fazer anos vs fazer aniversário）与“礼物”（prenda vs presente）",
        pt: "Em que dia é que fazes anos? Ofereceram-lhe as prendas.",
        br: "Quando você faz aniversário? Deram os presentes para ele.",
        note: "葡葡说“过生日”是 fazer anos，礼物常用 prenda 或 presente；巴葡说 fazer aniversário，礼物只用 presente。"
      }
    ]
  }
};

// 自动将葡巴对照数据注入各个单元与词条
(function enrichCourseDataWithPtBr() {
  const map = window.PT_BR_DATA.vocabBrMap;
  const diffs = window.PT_BR_DATA.unitDiffs;
  window.COURSE_DATA.units.forEach(u => {
    u.ptBrDiffs = diffs[u.id] || [];
    (u.vocab || []).forEach(v => {
      if (map[v.pt]) {
        v.br = map[v.pt].br;
        v.brNote = map[v.pt].note;
      }
    });
  });
})();

