import type { Collection,Document} from 'mongodb';
interface PaginateOptions {
    page?: number|string;
    limit?: number|string;
    sort?: Record<string, 1 | -1>;
}

interface PaginateResult {
    data: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * 通用 MongoDB 分頁查詢
 * @param collectionName - 集合名
 * @param options - 分頁選項
 * @param query - 查詢條件
 */
export async function paginate(
    collectionName: Collection,
    options: PaginateOptions = {},
    query: Document = {},
): Promise<PaginateResult> {
    const { page = 1, limit = 0, sort = { _id: -1 } } = options;
    let pageSize = Number(page)
    let pageLimit = Number(limit)
    const skip = (pageSize - 1) * pageLimit;
    const cursor = collectionName.find(query).sort(sort);
    if (pageLimit > 0) {
        cursor.skip(skip).limit(pageLimit);
    }
    const [data, total] = await Promise.all([
        cursor.toArray(),
        collectionName.countDocuments(query),
    ]);

    const totalPages = pageLimit > 0 ? Math.ceil(total / pageLimit) : (total > 0 ? 1 : 0);

    return {
        data,
        total,
        page:pageSize,
        limit:pageLimit,
        totalPages,
    };
}
