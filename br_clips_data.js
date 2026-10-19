// Authentic Brazilian TV Series Dialogue Clips & Unit Matcher Dataset
// Automatically updated by `python3 process_br_series.py` when you drop Brazilian series (.mp4/.mkv + .srt) into `videos/`
window.BR_CLIPS_DATA = {
  "intro": [
    {
      series: "Coisa Mais Linda (《最美之物》)",
      episode: "S01E01",
      timeRange: "00:02:14 - 00:02:18",
      pt: "Oi! Bom dia! Tudo bem com você?",
      zh: "嗨！早上好！你一切都好吗？",
      matchedWords: ["bom dia", "você"],
      note: "里约热内卢腔：Bom dia 的 d 在 [i] 前颚化读如 [dʒia]（类似“今呀”）",
      audioFile: ""
    },
    {
      series: "Avenida Brasil (《巴西大道》)",
      episode: "Ep.01",
      timeRange: "00:08:42 - 00:08:46",
      pt: "Com licença, por favor. Muito obrigada!",
      zh: "劳驾借过一下。非常感谢！（女性自称用 obrigada）",
      matchedWords: ["com licença", "por favor", "obrigada"],
      note: "巴葡日常高频礼貌用语，尾音 -e / -o 清晰饱满不吞音",
      audioFile: ""
    }
  ],
  "u1": [
    {
      series: "Coisa Mais Linda (《最美之物》)",
      episode: "S01E01",
      timeRange: "00:04:12 - 00:04:16",
      pt: "Oi, prazer! Qual é o seu nome? Eu me chamo Maria Luísa.",
      zh: "嗨，很高兴认识你！你叫什么名字？我叫玛丽亚·路易莎。",
      matchedWords: ["nome", "chamo"],
      note: "对比课本葡葡 Como te chamas? / Chamo-me...，巴剧口语一律把代词 me 放动词前",
      audioFile: ""
    },
    {
      series: "Sintonia (《同频共振》)",
      episode: "S01E02",
      timeRange: "00:11:05 - 00:11:09",
      pt: "Você é estudante ou professor? Sou estudante de português.",
      zh: "你是学生还是老师？我是葡语专业的学生。",
      matchedWords: ["estudante", "professor", "português", "sou"],
      note: "圣保罗口音示范：系动词 ser (sou / é) 与职业身份询问",
      audioFile: ""
    }
  ],
  "u2": [
    {
      series: "Bom Dia, Verônica (《早安薇罗妮卡》)",
      episode: "S01E01",
      timeRange: "00:06:30 - 00:06:35",
      pt: "Como você está hoje? Estou bem, obrigado. E a sua família?",
      zh: "你今天怎么样？我很好，谢谢。你家里人呢？",
      matchedWords: ["como", "está", "estou", "bem", "família"],
      note: "对比课本 Como estás?，巴剧熟人之间也普遍使用 Como você está? 或 Tudo bem?",
      audioFile: ""
    },
    {
      series: "Avenida Brasil (《巴西大道》)",
      episode: "Ep.03",
      timeRange: "00:15:20 - 00:15:25",
      pt: "Aquela moça bonita é minha amiga do Rio de Janeiro.",
      zh: "那边那位漂亮的姑娘是我来自里约热内卢的朋友。",
      matchedWords: ["bonita", "minha", "amiga"],
      note: "注意葡葡常用 rapariga 表示姑娘，而巴剧一律用 moça 或 menina！",
      audioFile: ""
    }
  ],
  "u3": [
    {
      series: "Coisa Mais Linda (《最美之物》)",
      episode: "S01E02",
      timeRange: "00:09:18 - 00:09:23",
      pt: "Onde você mora agora? Eu moro num apartamento perto da praia.",
      zh: "你现在住在哪里？我住在海滩附近的一套公寓里。",
      matchedWords: ["onde", "mora", "moro", "apartamento"],
      note: "课本用 andar 表示公寓套房，巴剧一律用 apartamento（口语常缩略为 apê）",
      audioFile: ""
    },
    {
      series: "3% (《百分之三》)",
      episode: "S01E01",
      timeRange: "00:14:02 - 00:14:07",
      pt: "Quantos quartos tem a casa dos seus pais?",
      zh: "你父母的房子有几个房间？",
      matchedWords: ["quantos", "quartos", "tem", "casa", "pais"],
      note: "规则动词 morar 与不规则动词 ter 的第三人称单数 tem",
      audioFile: ""
    }
  ],
  "u4": [
    {
      series: "Sintonia (《同频共振》)",
      episode: "S01E03",
      timeRange: "00:07:45 - 00:07:50",
      pt: "O que você está fazendo agora? Estou trabalhando no escritório.",
      zh: "你现在正在做什么？我正在办公室工作。",
      matchedWords: ["que", "agora", "estou", "escritório"],
      note: "巴剧最核心语法特征：用 estar + 副动词 (-ndo) 表达正在进行，而非葡葡的 estar a + 不定式",
      audioFile: ""
    }
  ],
  "u5": [
    {
      series: "Coisa Mais Linda (《最美之物》)",
      episode: "S01E03",
      timeRange: "00:12:33 - 00:12:38",
      pt: "A que horas você acorda todos os dias? Eu tomo café da manhã às oito.",
      zh: "你每天几点醒来？我八点钟吃早餐。",
      matchedWords: ["horas", "todos", "dias", "café", "manhã"],
      note: "早餐在巴剧中永远说 café da manhã（课本葡葡说 pequeno-almoço）",
      audioFile: ""
    }
  ],
  "u6": [
    {
      series: "Avenida Brasil (《巴西大道》)",
      episode: "Ep.05",
      timeRange: "00:19:10 - 00:19:15",
      pt: "Me traz um cafezinho e um suco de laranja gelado, por favor?",
      zh: "请给我来一杯浓缩咖啡和一杯冰镇橙汁好吗？",
      matchedWords: ["café", "laranja", "por favor"],
      note: "巴剧点餐高频表达：果汁用 suco（葡葡 sumo），冰镇用 gelado（葡葡 fresco）",
      audioFile: ""
    }
  ],
  "u7": [
    {
      series: "Cidade Invisível (《隐形城市》)",
      episode: "S01E02",
      timeRange: "00:05:50 - 00:05:55",
      pt: "Hoje está chovendo muito, mas amanhã vai fazer calor no Rio.",
      zh: "今天雨下得很大，但明天里约会很热。",
      matchedWords: ["hoje", "muito", "amanhã", "fazer", "calor"],
      note: "天气表达对比：正在下雨在巴剧中说 está chovendo（葡葡 está a chover）",
      audioFile: ""
    }
  ],
  "u8": [
    {
      series: "Bom Dia, Verônica (《早安薇罗妮卡》)",
      episode: "S01E02",
      timeRange: "00:10:15 - 00:10:20",
      pt: "Me liga no celular mais tarde! Eu vou pegar o ônibus ou o trem.",
      zh: "晚点打我手机！我去坐公交车或者火车。",
      matchedWords: ["mais", "tarde", "vou"],
      note: "三大交通/通讯高频词对比：手机 celular（葡葡 telemóvel）、公交 ônibus（葡葡 autocarro）、火车 trem（葡葡 comboio）",
      audioFile: ""
    }
  ],
  "u9": [
    {
      series: "Coisa Mais Linda (《最美之物》)",
      episode: "S01E04",
      timeRange: "00:16:40 - 00:16:45",
      pt: "Quanto custa esse vestido azul? Posso experimentar no provador?",
      zh: "这条蓝裙子多少钱？我可以去试衣间试试吗？",
      matchedWords: ["quanto", "custa", "vestido", "azul", "posso", "experimentar"],
      note: "巴葡口语常混用 esse/este 指代眼前的物品",
      audioFile: ""
    }
  ],
  "u10": [
    {
      series: "3% (《百分之三》)",
      episode: "S01E03",
      timeRange: "00:21:08 - 00:21:13",
      pt: "Ontem à noite a gente foi ao cinema e depois jantou junto.",
      zh: "昨晚我们去了电影院，然后一起吃了晚饭。",
      matchedWords: ["ontem", "noite", "foi", "cinema", "depois"],
      note: "巴剧口语极高频用 a gente（配第三人称单数动词 foi / jantou）代替 nós（我们）",
      audioFile: ""
    }
  ],
  "u11": [
    {
      series: "Sob Pressão (《高压急诊》)",
      episode: "S01E01",
      timeRange: "00:03:22 - 00:03:27",
      pt: "O que aconteceu? Estou com dor de cabeça e muita febre desde ontem.",
      zh: "发生什么事了？我从昨天起就一直头疼、发高烧。",
      matchedWords: ["que", "aconteceu", "dor", "cabeça", "febre", "ontem"],
      note: "医疗剧高频句型：estar com dor de cabeça（头疼）/ estar com febre（发烧）",
      audioFile: ""
    }
  ],
  "u12": [
    {
      series: "Cidade Invisível (《隐形城市》)",
      episode: "S01E04",
      timeRange: "00:13:12 - 00:13:18",
      pt: "Quando eu era criança, eu morava numa cidade pequena e ia à praia todo verão.",
      zh: "当我还是小孩子的时候，我住在一个小城市里，每年夏天都去海滩。",
      matchedWords: ["quando", "era", "criança", "morava", "cidade", "praia", "verão"],
      note: "过去未完成时（era / morava / ia）描写童年背景与过去习惯",
      audioFile: ""
    }
  ],
  "u13": [
    {
      series: "Coisa Mais Linda (《最美之物》)",
      episode: "S01E06",
      timeRange: "00:18:05 - 00:18:10",
      pt: "Com licença, você sabe onde fica a estação de metrô mais próxima?",
      zh: "劳驾，请问您知道最近的地铁站在哪里吗？",
      matchedWords: ["com licença", "sabe", "onde", "fica", "estação", "mais", "próxima"],
      note: "地铁在巴葡中拼作 metrô（重音在尾音节闭口 ô），在葡葡中拼作 metro（重音在首音节开音 e）",
      audioFile: ""
    }
  ],
  "u14": [
    {
      series: "Avenida Brasil (《巴西大道》)",
      episode: "Ep.12",
      timeRange: "00:24:50 - 00:24:55",
      pt: "Feliz Ano Novo! Espero que o próximo ano traga muita saúde, paz e alegria pra todo mundo!",
      zh: "新年快乐！希望新的一年给大家带来健康、平安与欢乐！",
      matchedWords: ["ano", "novo", "próximo", "saúde", "alegria", "todo"],
      note: "巴葡口语常把介词 para 缩读为 pra（如 pra todo mundo = para todo o mundo）",
      audioFile: ""
    }
  ]
};
