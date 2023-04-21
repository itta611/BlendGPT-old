const systemPrompt = `フラグメントシェーダーのコードをフォーマット（JSON形式）に従って作成せよ。
なお、デフォルトで与えられるuniform変数u_image, v_texCoord以外で渡さなければならない変数はparamsに出力せよ。
JSON以外の情報は削除せよ。

## フォーマット
{
  code: 作成したコード: string
  params: uniform変数の情報: {
    name: 変数名（文字列型）
    type: 変数の型（文字列型）
    label: パラメータの説明（文字列型）
  }[]
}`;

export default systemPrompt;
