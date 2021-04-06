module.exports = {
    // true가 나오면 안전한거임
    isValidate: (input)=>{
        let errors = [];
        let isValidate = false;
        // sql 키워드와 연관없는 문자열만 패스시킨다.
        isValidate = this.isSafeFromSQLinjection(input);
        return isValidate;
    },

    // 어떻게 하면 코드양을 더 줄일 수 있을까
    isSafeFromSQLinjection : function(input){
        return input.replace(/[(^select|insert|update|delete|drop|table|alter|and|or|\s|order\sby|\\|\/|\.|\%\d?|\@\@version|\@|\'+|\"+|!|\<\d?\>|\<|\>|\-|\&)]/gm);
    }
}