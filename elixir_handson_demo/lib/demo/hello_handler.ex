defmodule Demo.HelloHandler do
  def init(req, opts) do
    handle(req, opts)
  end

  defp handle(req, opts) do
    headers = %{"content-type" => "text/html"}
    req2 = :cowboy_req.reply(200, headers, build_body(), req)
    {:ok, req2, opts}
  end

  defp build_body do
    """
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <title>Sample Static</title>
      </head>
      <body>
        <h1>Cowboy</h1>
        <div class="root"></div>
      </body>
    </html>

    """
  end
end
