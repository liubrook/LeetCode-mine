class ParkingSystem {
  int[] cartContainer;
  public ParkingSystem(int big, int medium, int small) {
    cartContainer = new int[]{big, medium, small};
  }

  public boolean addCar(int carType) {
    return cartContainer[carType - 1]-- > 0;
  }
}