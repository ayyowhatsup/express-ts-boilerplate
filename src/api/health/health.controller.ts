export default function healthCheck(req: any, res: any, next: any) {
  return next({ status: 200, message: "OK" });
}
