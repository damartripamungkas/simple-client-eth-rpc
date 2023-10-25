export default class {
  public client: any;
  constructor(url: string, socketOpt: object) {
    this.client = {};
    this.client.on = () => {};
    this.client.request = async (data: any) => {
      const init = Object.assign(
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
        socketOpt
      );
      const res = await fetch(url, init);
      const jsonData = await res.json();
      return jsonData;
    };
  }

  isReady = (): boolean => {
    return true;
  };
}
