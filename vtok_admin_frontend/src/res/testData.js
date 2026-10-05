const randomDate = () => {
    const start = new Date(2012, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

export const testData = {

    file: [
        {id: 1, no: 1, categoryId: 200301, categoryName: "선택3", name: "ㄱ", version: 1, createDate: randomDate()},
        {id: 2, no: 2, categoryId: 2003, categoryName: "그림", name: "ㄴ", version: 4, createDate: randomDate()},
        {id: 3, no: 32, categoryId: 200203, categoryName: "선택3", name: "ㄷ", version: 2, createDate: randomDate()},
        {id: 4, no: 572, categoryId: 100201, categoryName: "선택3", name: "ㄹ", version: 86, createDate: randomDate()},
        {id: 5, no: 38, categoryId: 100101, categoryName: "선택3", name: "ㅁ", version: 6, createDate: randomDate()},
        {id: 6, no: 759, categoryId: 100104, categoryName: "선택3", name: "ㅂ", version: 4, createDate: randomDate()},
        {id: 7, no: 63246, categoryId: 100104, categoryName: "선택3", name: "ㅅ", version: 56, createDate: randomDate()},
        {id: 8, no: 4569, categoryId: 100106, categoryName: "선택3", name: "ㅇ", version: 7, createDate: randomDate()},
        {id: 9, no: 324, categoryId: 100202, categoryName: "선택3", name: "ㅈ", version: 99, createDate: randomDate()},
        {id: 10, no: 8345634, categoryId: 100104, categoryName: "선택3", name: "ㅊ", version: 3, createDate: randomDate()},
        {id: 11, no: 7345, categoryId: 200206, categoryName: "선택3", name: "ㅋ", version: 1, createDate: randomDate()},
    ],

    mainCategory: [
        {no: 1, name: "가구", id: 10, createDate: randomDate()},
        {no: 2, name: "소품", id: 20, createDate: randomDate()},
    ],

    subCategory: [
        {no: 3, name: "소파", id: 1001, createDate: randomDate()},
        {no: 4, name: "냉장고", id: 1002, createDate: randomDate()},
    ],

    subCategory2: [
        {no: 5, name: "조명", id: 2001, createDate: randomDate()},
        {no: 6, name: "시계", id: 2002, createDate: randomDate()},
        {no: 7, name: "그림", id: 2003, createDate: randomDate()},
    ],

    minCategory1: [
        {no: 8, name: "선택1", id: 100101, createDate: randomDate()},
        {no: 9, name: "선택2", id: 100102, createDate: randomDate()},
        {no: 10, name: "선택3", id: 100103, createDate: randomDate()},
        {no: 11, name: "선택4", id: 100104, createDate: randomDate()},
        {no: 12, name: "선택5", id: 100105, createDate: randomDate()},
        {no: 13, name: "선택6", id: 100106, createDate: randomDate()},
        {no: 14, name: "선택7", id: 100107, createDate: randomDate()},
        {no: 15, name: "선택8", id: 100108, createDate: randomDate()},
        {no: 16, name: "선택9", id: 100109, createDate: randomDate()},
        {no: 17, name: "선택10", id: 100110, createDate: randomDate()},
        {no: 18, name: "선택11", id: 100111, createDate: randomDate()},
        {no: 19, name: "선택12", id: 100112, createDate: randomDate()},
        {no: 20, name: "선택13", id: 100113, createDate: randomDate()},
    ],

    minCategory2: [
        {no: 21, name: "삼성", id: 100201, createDate: randomDate()},
        {no: 22, name: "엘지", id: 100202, createDate: randomDate()},
    ],

    minCategory4: [
        {no: 245768458, name: "선택1", id: 200201, createDate: randomDate()},
        {no: 457, name: "선택2", id: 200202, createDate: randomDate()},
        {no: 2346326, name: "선택3", id: 200203, createDate: randomDate()},
        {no: 47345, name: "선택4", id: 200204, createDate: randomDate()},
        {no: 568456, name: "선택5", id: 200205, createDate: randomDate()},
        {no: 98678, name: "선택6", id: 200206, createDate: randomDate()},
    ],

}