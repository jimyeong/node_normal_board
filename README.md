# 작업중, 궁금해진 것들[sql injection, Map, right outer join]
## 2021.03.18
#### 1.sql injection 을 방어하는 방법들
* 입력값을 검증하는 코드를 만든다, 정규식을 통해서, query 키워드, 연산자, 콤마,각종 특수문자 및 기호들
* 저장 프로시저를 사용한다. 
* 신뢰할 수 있는 서버, 네트워크만 접근 허용한다.
* db권한을 최소한으로만 부여하고, 그 권한을 부여받은 유저로만 db를 운영한다.  

참조: http://blog.plura.io/?p=6056
#### 2.Map 객체를 사용할 때 interate, while를 가지고 순회하는 방법 in javascript
* Java에서의 Map의 사용과는 조금 달라서, 시간을 좀 뺴앗겼다.  
 내가 공부 한 방식으로 하고 싶어서 좀 집착했던 면도 없지 않다. 
```
const map = new Map;
const iterator = map.entries();
while(!iterator.next().done){
    // 결과가 좀 이상하게 나온다. 왜 hasNext()가 없는걸까..
    [key, value] = iterator.next().value;
    [key, value] = iterator.next().key
}
```
#### 3.left 조인과 right 조인의 차이
```
//  프로젝트 마무리 전까지 확인해놓자.
```
