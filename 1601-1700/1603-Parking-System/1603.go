type ParkingSystem struct {
	Cap [3]int
	Cur [3]int
}

func Constructor(bit int, medium int, small int) ParkingSystem {
	return ParkingSystem{
		Cap: [3]int{big, medium, small},
		Cur: [3]int{0, 0, 0},
	}
}

func (this *ParkingSystem) AddCar(carType int) bool {
	if this.Cap[carType-1] > this.Cur[carType-1] {
		this.Cur[carType-1]++
		return true
	}
	return false
}