// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  code: string;
  image: string;
};

interface Response {
  data: Data[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const result = axios
    .get("https://bcpag-test-mock.azurewebsites.net/api/brands", {
      headers: {
        "X-Functions-Key":
          "6Lap4DX36mVCdSMTRxpIMAvNzwMRIXrq1iW2CMO2gUzf8vzvvJEJaA==",
      },
    })
    .then((response) => {
      const brandFiltered = response.data.filter(
        (brand) => brand.code !== "hiper"
      );

      return res.status(200).json({ data: brandFiltered });
    })
    .catch((err) => {
      return res.send(err);
    });
}

//removes false warnings
export const config = {
  api: {
    externalResolver: true,
  },
};
