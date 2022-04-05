import { Injectable, Logger } from "@nestjs/common";
@Injectable()
export class SearchPaginationService {

    private logger = new Logger(SearchPaginationService.name);

    async searchPagination(model, request) {

        let page = 1, limit = 10;

        if (request.body.page && request.body.limit) {
            page = parseInt(request.body.page);
            limit = parseInt(request.body.limit);
        }

        if (request.body.queryes) {
            const controls = Object.keys(request.body.queryes);
            controls.forEach(control => {
                if (request.body.queryes.hasOwnProperty(control) && request.body.queryes[control]) {
                    if (Object.prototype.toString.call(request.body.queryes[control]) === "[object String]") {
                        request.body.queryes[control] = {
                            $regex: '.*' + request.body.queryes[control] + '.*',
                            $options: 'i'
                        }
                    }
                }
            });
        }

        request.body.queryes.isDeleted = false;

        const queryes = request.body.queryes ? request.body.queryes : {};
        const populates = request.body.populates ? request.body.populates : [];
        const selects = request.body.selects ? request.body.selects : [];
        const startIndex = (page - 1) * limit;

        const currentPage = page;
        const results = await Object.assign(model).find(queryes).populate(populates).sort({ 'createdAt': -1 }).limit(limit).skip(startIndex).select(selects).exec();
        const totalResults = await Object.assign(model).countDocuments(queryes).exec();

        let response = {
            currentPage,
            results,
            totalResults
        }

        return response;
    }
}