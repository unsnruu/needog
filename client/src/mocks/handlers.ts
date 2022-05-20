import { rest } from "msw";
const handlers = [
  rest.get(
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes`,
    (req, res, ctx) => {
      const query = req.url.searchParams.get("regcode_pattern");

      const sido = { code: "1100000000", name: "서울특별시" };
      const sigungu = { code: "1111000000", name: "서울특별시 종로구" };

      const region = query === "??00000000" ? sido : sigungu;
      return res(ctx.json({ regcodes: [region] }));
    }
  ),
  rest.post("/missing", (req, res, ctx) => {}),
];

export default handlers;
