import { ClsServiceManager } from 'nestjs-cls';
import { IUser } from '../interface/user.i';
import { getUserCls } from './get-user-cls';

jest.mock('nestjs-cls', () => ({
  ClsServiceManager: {
    getClsService: jest.fn().mockReturnValue({
      get: jest.fn(),
    }),
  },
}));

describe('getUserCls', () => {
  const mockUser: IUser = { id: 1, roleId: 1 }; // Đảm bảo mockUser phù hợp với IUser

  beforeEach(() => {
    jest.clearAllMocks(); // Xóa tất cả mock trước mỗi test
  });

  it('should return parsed user object when user is found', () => {
    // Mock phương thức get trả về một chuỗi JSON hợp lệ
    (ClsServiceManager.getClsService().get as any).mockReturnValue(
      JSON.stringify(mockUser),
    );

    const result = getUserCls();

    expect(ClsServiceManager.getClsService).toHaveBeenCalled();
    expect(ClsServiceManager.getClsService().get).toHaveBeenCalledWith('user');
    expect(result).toEqual(mockUser); // Kiểm tra nếu kết quả trả về là object user
  });

  it('should return null if no user is found (null case)', () => {
    // Mock phương thức get trả về null
    (ClsServiceManager.getClsService().get as any).mockReturnValue(null);

    const result = getUserCls();

    expect(ClsServiceManager.getClsService).toHaveBeenCalled();
    expect(ClsServiceManager.getClsService().get).toHaveBeenCalledWith('user');
    expect(result).toBeNull(); // Kiểm tra kết quả trả về null
  });

  it('should throw an error if user JSON is invalid', () => {
    // Mock phương thức get trả về một chuỗi JSON không hợp lệ
    (ClsServiceManager.getClsService().get as any).mockReturnValue(
      'invalid JSON',
    );

    expect(() => getUserCls()).toThrow(SyntaxError); // Kiểm tra xem có ném ra lỗi không
  });
});
