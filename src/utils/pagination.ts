export function pagination(req: any, limit: number) {
  const page = parseInt(req.query.page as string) || 1; 
  const skip = (page - 1) * limit;
  return {page, skip, limit}
}