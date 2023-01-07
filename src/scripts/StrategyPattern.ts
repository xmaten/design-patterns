/*
  RESOURCES:
  https://www.youtube.com/watch?v=v9ejT8FO-7I
  https://refactoring.guru/design-patterns/strategy
  https://www.youtube.com/watch?v=13nftsQUUE0
 */

// Generic interface which will be implemented in classes that calculate route
interface RouteStrategy {
  calculateRoute(pointA: string, pointB: string): string
}

// Generic interface which will be implemented in classes that calculate traffic
interface TrafficStrategy {
  getTrafficInfo(pointA: string, pointB: string): string
}

// First route strategy - it should implement calculating route by car in some way
class RouteStrategyCar implements RouteStrategy {
  calculateRoute(pointA: string, pointB: string): string {
    const time = '30 minutes'
    const cost = '$50'

    return `Trip by car from ${pointA} to ${pointB} will take ${time} and will cost ${cost}`
  }
}

// Second route strategy - it should implement calculating route by bike in some other way than previous class
class RouteStrategyBike implements RouteStrategy {
  calculateRoute(pointA: string, pointB: string): string {
    const time = '2 hours'
    const cost = '$5'

    return `Trip by bike from ${pointA} to ${pointB} will take ${time} and will cost ${cost}`
  }
}

// Third route strategy - it should implement calculating route by bus in some other way than previous class
class RouteStrategyBus implements RouteStrategy {
  calculateRoute(pointA: string, pointB: string): string {
    const time = '1 hour'
    const cost = '$15'

    return `Trip by bus from ${pointA} to ${pointB} will take ${time} and will cost ${cost}`
  }
}

// First traffic strategy = it should implement calculating route by car in some way
class TrafficStrategyCar implements TrafficStrategy {
  getTrafficInfo(pointA: string, pointB: string): string {
    return 'Traffic high'
  }
}

// Second traffic strategy = it should implement calculating route by bike in some other way
class TrafficStrategyBike implements TrafficStrategy {
  getTrafficInfo(pointA: string, pointB: string): string {
    return 'Traffic low'
  }
}

// Class that takes some strategies and shares methods that will run that strategies implementation
// It also shares setStrategy method that let's swap strategies during runtime (no need to create new instance of class)
export class Navigator {
  private navigatorStrategy: RouteStrategy
  private trafficStrategy: TrafficStrategy

  constructor(navigatorStrategy: RouteStrategy, trafficStrategy: TrafficStrategy) {
    this.navigatorStrategy = navigatorStrategy
    this.trafficStrategy = trafficStrategy
  }

  public setStrategy(navigatorStrategy: RouteStrategy, trafficStrategy: TrafficStrategy) {
    this.navigatorStrategy = navigatorStrategy
    this.trafficStrategy = trafficStrategy
  }

  public calculateRoute(pointA: string, pointB: string): string {
    return this.navigatorStrategy.calculateRoute(pointA, pointB)
  }

  public getTrafficInfo(pointA: string, pointB: string): string {
    return this.trafficStrategy.getTrafficInfo(pointA, pointB)
  }
}

// Method that demonstrates usage of design pattern
export const calculateRoute = () => {
  // We are creating new instances of both strategies for car
  const carNavigatorStrategy = new RouteStrategyCar()
  const carTrafficStrategy = new TrafficStrategyCar()
  // We are creating new instance of navigator, then we pass instances of strategies
  const myNavigator = new Navigator(carNavigatorStrategy, carTrafficStrategy)
  // We are getting data about car and logging it to console
  const carRoute = myNavigator.calculateRoute('Warsaw', 'Gdansk')
  const carTraffic = myNavigator.getTrafficInfo('Warsaw', 'Gdansk')
  console.log(carRoute, carTraffic)

  // We are creating instances of strategies for bike
  const bikeNavigatorStrategy = new RouteStrategyBike()
  const bikeTrafficStrategy = new TrafficStrategyBike()
  // We are using setStrategy method to replace car strategies, there is no need to create new instance of navigator
  myNavigator.setStrategy(bikeNavigatorStrategy, bikeTrafficStrategy)
  // We are getting data about bike and logging it to console
  const bikeRoute = myNavigator.calculateRoute('Poznan', 'Cracow')
  const bikeTraffic = myNavigator.getTrafficInfo('Poznan', 'Cracow')
  console.log(bikeRoute, bikeTraffic)

  // We are creating new instance of route strategy for bus
  const busNavigatorStrategy = new RouteStrategyBus()
  // We are using set strategy to replace previous strategies
  // NOTE: we are reusing carTrafficStrategy, because in our example calculating traffic for car and bus is the same
  // Technically it doesn't make sense, but let's imaging that for educational purposes it does.
  // It's meant to show that we can reuse different strategies and compose out navigator with them.
  myNavigator.setStrategy(busNavigatorStrategy, carTrafficStrategy)
  //We are getting data and logging it to console
  const busRoute = myNavigator.calculateRoute('Poznan', 'Cracow')
  const busTraffic = myNavigator.getTrafficInfo('Poznan', 'Cracow')
  console.log(busRoute, busTraffic)
}
