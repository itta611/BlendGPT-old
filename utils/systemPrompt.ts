const systemPrompt = `Pillowライブラリを使ったPythonのコードをフォーマット（JSON形式）に従って作成せよ。
なお、作成するコードは関数editImageのみを定義し、引数にはimage, paramsが与えられるものとする。
JSON以外の情報は削除する。

{
  code: 作成したPythonのコード（文字列型）
  params: editImageの引数paramsの型情報（辞書型）
}`;

export default systemPrompt;
