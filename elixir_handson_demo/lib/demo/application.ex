defmodule Demo.Application do
  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    # Define workers and child supervisors to be supervised
    children = [
      # Starts a worker by calling: Demo.Worker.start_link(arg1, arg2, arg3)
      worker(__MODULE__, [], function: :start_cowboy),
      supervisor(Phoenix.PubSub.PG2, [:chat_pubsub, []])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Demo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def start_cowboy do
    routes = [
      {"/", Demo.HelloHandler, []},
      {"/websocket", Demo.WebSocketHandler, []},
      {"/greet/:name", Demo.GreetHandler, []},
      {"/static/[...]", :cowboy_static, {:priv_dir, :demo, "static_files"}}
    ]
    dispatch = :cowboy_router.compile([{:_, routes}]) # パス定義
    opts = [{:port, 4000}]
    env = %{dispatch: dispatch}
    {:ok, pid} = :cowboy.start_clear(
      :http, # Listener
      10, # プロセス数
      opts, # トランスポートオプション(port番号など)
      %{env: env} # プロトコルオプション(ルーティングなど)
      )
  end
end
