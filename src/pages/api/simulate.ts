// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type BrandSimulation = {
  brand: string;
  tax: number;
  tax_amount: number;
};

type Data = {
  amount: number;
  brands: string[];
  installment: number;
  brand_simulation: BrandSimulation[];
};

interface Response {
  data: Data[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const body = req.body;

  const data = axios
    .post("https://bcpag-test-mock.azurewebsites.net/api/simulate", body, {
      headers: {
        "X-Functions-Key":
          "6Lap4DX36mVCdSMTRxpIMAvNzwMRIXrq1iW2CMO2gUzf8vzvvJEJaA==",
      },
    })
    .then((response) => {
      return res.status(200).json({ data: response.data.data });
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
