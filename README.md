# 뉴이어

## Conventions

---
### Commit/Branch 분류 규칙
- [Feat] : 새로운 기능에 대한 커밋
- [Fix] : 버그 수정에 대한 커밋
- [Build] : 빌드 관련 파일 수정에 대한 커밋
- [Chore] : 그 외 자잘한 수정에 대한 커밋
- [Ci] : CI관련 설정 수정에 대한 커밋
- [Docs] : 문서 수정에 대한 커밋
- [Style] : 코드 스타일 혹은 포맷 등에 관한 커밋
- [Test] : 테스트 코드 수정에 대한 커밋
- Commit 예시
  - 예 ) git commit -m "feat: login 기능 구현"
- Branch 예시
    - 예 ) git checkout -b feat/login

### Issue-based Commit
- Issue 가 존재한다면 해당 Issue 의 번호를 다음과 같이 commit 메세지 앞에 붙여 commit 을 진행한다
- "(Commit 분류): 커밋 내용 #(해당 이슈 번호)"
---
### Pull Request

- FE 에서 PR 할 경우 [FE] 를 붙인 후 PR
- BE 에서 PR 할 경우 [BE] 를 붙인 후 PR

- 개인 branch => (소속)_feature branch 로 PR 하는 경우
    - "[소속] (Commit 분류): PR 내용" 의 형태로 작성
    - 예 ) [FE] Feat: 첫번째 커밋입니다.
  
- (소속)_feature branch => dev branch 로 PR 하는 경우
    - "[소속] (MainMerge): PR 내용" 의 형태로 작성
    - 예 ) [BE] merge: dev에 bak_feature 머지합니다.
  
- dev branch => main branch 로 PR 하는 경우
  - "[dev] (MainMerge): PR 내용" 의 형태로 작성
  - 예 ) [dev] MainMerge: Main에 dev 머지합니다.
