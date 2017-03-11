defmodule Demo.WebSocketHandler do
  @behaviour :cowboy_websocket
  @room_name "mytopic"

  def init(req, opts) do
    {:cowboy_websocket, req, opts}
  end

  def websocket_init(opts) do
    Phoenix.PubSub.subscribe(:chat_pubsub, @room_name)
    {:ok, opts}
  end

  def websocket_handle({:text, content}, opts) do
    Phoenix.PubSub.broadcast(:chat_pubsub, @room_name, {:text, content})
    {:ok, opts}
  end

  def websocket_handle(_frame, opts) do
    {:ok, opts}
  end

  def websocket_info({:text, content}, opts) do
    {:reply, {:text, content}, opts}
  end

  def websocket_info(_info, opts) do
    {:ok, opts}
  end

  def terminate(_reason, _req, _opts) do
    Phoenix.PubSub.unsubscribe(:chat_pubsub, @room_name)
  end
end
