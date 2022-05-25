export const apiPathConfigs = {
  // 获取当前用户
  currentuser: {
    url: '/auth/currentuser',
    method: 'get'
  },
  userList: { // 公司所有用户
    url: '/system/user/list?pageNum={0}&pageSize={1}&&deptId={2}&userName={3}&nickName={4}&page={5}',
    method: 'get'
  }
}
