import { Request, Response, NextFunction } from "express";
export default (requireds: any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data: any = req.method.toLowerCase() == "post" ? req.body : req.query;
    const fieldname: string | undefined = req.file?.fieldname;
    fieldname && (data[fieldname] = fieldname);

    const arr = requireds.filter((e) => !data[e]);
    !arr.length ? next() : res.json({ code: 500, msg: "参数缺失" });
  };
};
