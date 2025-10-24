/********************************************************************************
 * データ管理
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

const data = {
  beginner: [
    { kanji: "頂きます。", yomi: "いただきます。", alp: "itadakimasu." },
    { kanji: "致します。", yomi: "いたします。", alp: "itasimasu." },
    { kanji: "かった", yomi: "かった", alp: "katta" },
    { kanji: "考えて", yomi: "かんがえて", alp: "kangaete" },
    { kanji: "今日", yomi: "きょう", alp: "kyou" },
    { kanji: "ございます。", yomi: "ございます。", alp: "gozaimasu." },
    { kanji: "していた", yomi: "していた", alp: "siteita" },
    { kanji: "いない", yomi: "いない", alp: "inai" },
    { kanji: "います。", yomi: "います。", alp: "imasu." },
    { kanji: "しており、", yomi: "しており、", alp: "siteori," },
    { kanji: "じゃない", yomi: "じゃない", alp: "janai" },
    { kanji: "そして、", yomi: "そして、", alp: "sosite," },
    { kanji: "それで、", yomi: "それで、", alp: "sorede," },
    { kanji: "だから、", yomi: "だから、", alp: "dakara," },
    { kanji: "だけど、", yomi: "だけど、", alp: "dakedo," },
    { kanji: "だった。", yomi: "だった。", alp: "datta." },
    { kanji: "ついて", yomi: "ついて", alp: "tuite" },
    { kanji: "って事", yomi: "ってこと", alp: "ttekoto" },
    { kanji: "でした。", yomi: "でした。", alp: "desita." },
    { kanji: "でしょうか？", yomi: "でしょうか？", alp: "desyouka?" },
    { kanji: "ですが、", yomi: "ですが、", alp: "desuga," },
    { kanji: "という事", yomi: "ということ", alp: "toiukoto" },
    { kanji: "と思います。", yomi: "とおもいます。", alp: "toomoimasu." },
    { kanji: "所", yomi: "ところ", alp: "tokoro" },
    { kanji: "として、", yomi: "として、", alp: "tosite," },
    { kanji: "ないか", yomi: "ないか", alp: "naika" },
    { kanji: "なってます。", yomi: "なってます。", alp: "nattemasu." },
    { kanji: "なので、", yomi: "なので、", alp: "nanode," },
    { kanji: "になって", yomi: "になって", alp: "ninatte" },
    { kanji: "のような", yomi: "のような", alp: "noyouna" },
    { kanji: "のように", yomi: "のように", alp: "noyouni" },
    { kanji: "ました。", yomi: "ました。", alp: "masita." },
    { kanji: "もまた", yomi: "もまた", alp: "momata" },
    { kanji: "私は", yomi: "わたしは", alp: "watasiha" },
    { kanji: "なんです。", yomi: "なんです。", alp: "nandesu." },
    { kanji: "みんな", yomi: "みんな", alp: "minnna" },
    { kanji: "そんな", yomi: "そんな", alp: "sonnna" },
    { kanji: "こんな", yomi: "こんな", alp: "konnna" },
    { kanji: "あんな", yomi: "あんな", alp: "annna" },
    { kanji: "こんにちは", yomi: "こんにちは", alp: "konnnitiha" },
    { kanji: "単位", yomi: "たんい", alp: "tanni" },
    { kanji: "信用", yomi: "しんよう", alp: "sinnyou" },
    { kanji: "原因は", yomi: "げんいんは", alp: "genninha" },
    { kanji: "何の", yomi: "なんの", alp: "nannno" },
    { kanji: "順に", yomi: "じゅんに", alp: "junnni" },
    { kanji: "遷移する", yomi: "せんいする", alp: "sennisuru" },
    { kanji: "自分の", yomi: "じぶんの", alp: "jibunnno" },
    { kanji: "牛乳", yomi: "ぎゅうにゅう", alp: "gyuunyuu" },
    { kanji: "フワフワ", yomi: "ふわふわ", alp: "huwahuwa" },
    { kanji: "ディスク", yomi: "でぃすく", alp: "dhisuku" },
    { kanji: "ディープラーニング", yomi: "でぃーぷらーにんぐ", alp: "dhi-pura-ningu" },
    { kanji: "ティッシュ", yomi: "てぃっしゅ", alp: "thissyu" },
  ],
  intermediate: [
    {
      kanji: "お疲れ様です。",
      yomi: "おつかれさまです。",
      alp: "otukaresamadesu.",
    },
    {
      kanji: "お世話になっております。",
      yomi: "おせわになっております。",
      alp: "osewaninatteorimasu.",
    },
    {
      kanji: "承知いたしました。",
      yomi: "承知いたしました。",
      alp: "syoutiitasimasita.",
    },
    {
      kanji: "大変申し訳ございません。",
      yomi: "たいへんもうしわけございません。",
      alp: "taihenmousiwakegozaimasen.",
    },
    {
      kanji: "ご対応ありがとうございました。",
      yomi: "ごたいおうありがとうございました。",
      alp: "gotaiouarigatougozaimasita.",
    },
    {
      kanji: "ご確認のほどよろしくお願いいたします。",
      yomi: "ごかくにんのほどよりしくおねがいいたします。",
      alp: "gokakuninnnohodoyorosikuonegaiitasimasu.",
    },
    {
      kanji: "お忙しいところ恐縮ですが、よろしくお願いいたします。",
      yomi: "おいそがしいところきょうしゅくですが、よろしくおねがいいたします。",
      alp: "oisogasiitokorokyousyukudesuga,yorosikuonegaiitasimasu.",
    },
    {
      kanji: "昨日はお打ち合わせありがとうございました。",
      yomi: "さくじつはおうちあわせありがとうございました。",
      alp: "sakujituhaoutiawasearigatougozaimasita.",
    },
    {
      kanji: "ご都合の良い日時を教えていただけますでしょうか。",
      yomi: "ごつごうのよいにちじをおしえていただけますでしょうか。",
      alp: "gotugounoyoinitijiwoosieteitadakemasudesyouka.",
    },
    {
      kanji: "少々お待ちいただけますでしょうか。",
      yomi: "しょうしょうおまちいただけますでしょうか。",
      alp: "syousyouomatiitadakemasudesyouka.",
    },
    {
      kanji: "ちゃんとバックアップを取っておいてください。",
      yomi: "ちゃんとバックアップをとっておいてください。",
      alp: "tyantobakkuappuwototteoitekudasai.",
    },
    {
      kanji: "プログラムがバグっています。",
      yomi: "プログラムがバグっています。",
      alp: "puroguramugabagutteimasu.",
    },
    {
      kanji: "ミドルウェアのアップデートが完了しました。",
      yomi: "ミドルウェアのアップデートがかんりょうしました。",
      alp: "midoruweanoappude-togakanryousimasita.",
    },
    {
      kanji: "生麦生米生卵",
      yomi: "なむむぎなまごめなまたまご",
      alp: "namamuginamagomenamatamago",
    },
    {
      kanji: "赤巻紙青巻紙黄巻紙",
      yomi: "あかまきがみあおまきがみきまきがみ",
      alp: "akamakigamiaomakigamikimakigami",
    },
  ],
  advanced: [
    {
      kanji:
        "JavaScriptのフレームワークでシングルページアプリケーションを開発中にちょっとしたバグが発生してしまいました。",
      yomi: "JavaScriptのフレームワークでシングルページアプリケーションをかいはつちゅうにちょっとしたバグがはっせいしてしまいました。",
      alp: "javascriptnohure-muwa-kudesingurupe-jiapurike-syonwokaihatutyuunityottositabagugahasseisitesimaimasita.",
    },
    {
      kanji:
        "インフラストラクチャーの構築において、セキュリティポリシーの設定が最も重要な要素の一つです。",
      yomi: "いんふらすとらくちゃーのこうちくにおいて、せきゅりてぃぽりしーのせっていがもっともじゅうようなようそのひとつです。",
      alp: "inhurasutorakutya-nokoutikunioite,sekyurithiporisi-nosetteigamottomojuuyounayousonohitotudesu.",
    },
    {
      kanji:
        "マイクロサービスアーキテクチャーでは、各コンポーネントがそれぞれ独立してスケールアウトできます。",
      yomi: "マイクロサービスアーキテクチャーでは、かくコンポーネントがそれぞれどくりつしてスケールアウトできます。",
      alp: "maikurosa-bisua-kitekutya-deha,kakukonpo-nentogasorezoredokuritusitesuke-ruautodekimasu.",
    },
    {
      kanji:
        "プロトタイプベースのオブジェクト指向プログラミングパラダイムでは、継承よりもコンポジションを重視します。",
      yomi: "プロトタイプベースのオブジェクトしこうプログラミングパラダイムでは、けいしょうよりもコンポジションをじゅうしします。",
      alp: "purototaipube-sunoobujekutosikoupuroguraminguparadaimudeha,keisyouyorimokonpojisyonwojuusisimasu.",
    },
    {
      kanji:
        "ディープラーニングとニューラルネットワークを組み合わせた機械学習アルゴリズムの実装について説明します。",
      yomi: "ディープラーニングとニューラルネットワークをくみあわせたきかいがくしゅうアルゴリズムのじっそうについてせつめいします。",
      alp: "dhi-pura-ningutonyu-rarunettowa-kuwokumiawasetakikaigakusyuuarugorizumunojissounituitesetumeisimasu.",
    },
    {
      kanji:
        "レスポンシブウェブデザインでブレイクポイントを適切に設定してユーザビリティを向上させましょう。",
      yomi: "レスポンシブウェブデザインでブレイクポイントをてきせつにせっていしてユーザビリティをこうじょうさせましょう。",
      alp: "resuponsibuwebudezaindebureikupointowotekisetunisetteisiteyu-zabirithiwokoujousasemasyou.",
    },
  ],
}
