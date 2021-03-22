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


## 2021.03.19
#### 로그인 기능이 없으니, 생기는 변수들
* 삭제를 할 때, 이름을 타이핑 해야만 삭제 할수 있도록 하자

#### 한페이지에 모든 데이터를 다 보여주려닌 생기는 문제들
* processing 작업 하느라, 페이지가 조금 늦게 그려지는 것 같다.
* TreeMap을 통해서 코멘트가 작성순서대로 보여지도록 하자, 
* 서브쿼리를 쓰면 쿼리를 한번만 써주면 되는 것 아닌가 하는 생각이 드는데  
문제는 생각보다 내가 쿼리를 잘 못만드는 것 같다.
* sql문을 실행시키기 전에 방어 코드를 작성해주어야 할 것 같다.


## 2021.03.20
#### SQL injection 방어코드 만들자
* 블랙리스트는, 가능한 수가 많다고 하니, 영숫자만을 받는 화이트 리스트로 작성

```
// sql방어 코드, 조금더 짧게 만들 수 있을 텐데.. 일단..
/[(^select|insert|update|delete|drop|table|alter|and|or|\s|order\sby|\\|\/|\.|\%\d?|\@\@version|\@|\'+|\"+|!|\<\d?\>|\<|\>|\-|\&)]/gm
```
 
#### 전역함수로 함수등록
* validation 같은 helper 코드는 전역함수에 등록해 놔야 할 것 같다.
* nodejs에서 헤더를 어떻게 설정해주지? ex) cors 허용 같은거
 
 
 ## 2021.03.21
 #### 클라우드 db 에 연결하기, 
 * workbench 에 연결하기 위해서는,  public access 를 ***publicly accessible***로 해야한다. 
 * security group 에서 inbound(서버로 들어오는) 와 outbound(서버에서 나가는) 를 설정한다. type 은 MYSQL/AURORA, protocol 은 tcp  
 cli 을 통해서 접속하고 싶다면 custom tcp port: 3306 으로 한다.
 
  
 * 내 컴퓨터에서 보내는 요청만, 받고 싶은지(select box 를 클릭하면 my Ip 매뉴를 선택할 수 있다.), 모든 요청을 다 받고 싶은지(0.0.0.0/0, ::/0), 셋팅한다.
 * heroku 를 사용하여 호스팅하게 되면, 요청을 보내는 아이피주소를 바꿔준다.
 
   
