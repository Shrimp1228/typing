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
    { kanji: "みんな", yomi: "みんな", alp: "min'na" },
    { kanji: "そんな", yomi: "そんな", alp: "son'na" },
    { kanji: "こんな", yomi: "こんな", alp: "kon'na" },
    { kanji: "あんな", yomi: "あんな", alp: "an'na" },
    { kanji: "こんにちは", yomi: "こんにちは", alp: "kon'nitiha" },
    { kanji: "単位", yomi: "たんい", alp: "tan'i" },
    { kanji: "信用", yomi: "しんよう", alp: "sin'you" },
    { kanji: "原因は", yomi: "げんいんは", alp: "gen'inha" },
    { kanji: "何の", yomi: "なんの", alp: "nan'no" },
    { kanji: "順に", yomi: "じゅんに", alp: "jun'ni" },
    { kanji: "遷移する", yomi: "せんいする", alp: "sen'isuru" },
    { kanji: "自分の", yomi: "じぶんの", alp: "jibun'no" },
    { kanji: "牛乳", yomi: "ぎゅうにゅう", alp: "gyuunyuu" },
    { kanji: "フワフワ", yomi: "ふわふわ", alp: "huwahuwa" },
    { kanji: "あいうえお", yomi: "あいうえお", alp: "aiueo" },
    { kanji: "かきくけこ", yomi: "かきくけこ", alp: "kakikukeko" },
    { kanji: "さしすせそ", yomi: "さしすせそ", alp: "sasisuseso" },
    { kanji: "たちつてと", yomi: "たちつてと", alp: "tatituteto" },
    { kanji: "なにぬねの", yomi: "なにぬねの", alp: "naninuneno" },
    { kanji: "はひふへほ", yomi: "はひふへほ", alp: "hahihuheho" },
    { kanji: "まみむめも", yomi: "まみむめも", alp: "mamimumemo" },
    { kanji: "やゆよ", yomi: "やゆよ", alp: "yayuyo" },
    { kanji: "らりるれろ", yomi: "らりるれろ", alp: "rarirurero" },
    { kanji: "わをん", yomi: "わをん", alp: "wawon'" },
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
      alp: "gokakunin'nohodoyorosikuonegaiitasimasu.",
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
