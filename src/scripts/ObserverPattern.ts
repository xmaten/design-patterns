/*
  RESOURCES
  https://www.youtube.com/watch?v=_BpmfnqjgzQ
  https://refactoring.guru/design-patterns/observer
*/

interface Observable {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
  notify: (value: string) => void;
}

interface Observer {
  update: (value: string) => void;
}

class WeatherStation implements Observable {
  public temperature: string = "0";
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    const doesExits = this.observers.includes(observer);
    if (doesExits) {
      return console.log("Observer is already subscribing");
    }

    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    const observerIndex = this.observers.indexOf(observer);
    if (!observerIndex) {
      return console.log("Observer doesnt exist");
    }

    this.observers.splice(observerIndex, 1);
  }

  notify(value: string) {
    this.observers.forEach((observer) => observer.update(value));
  }

  // Usually business logic would be extracted to some different class to maintain
  // Single Responsibility Principle
  updateTemperatureReading() {
    const newValue = (Math.random() * 10).toFixed(0);
    this.temperature = newValue;

    this.notify(this.temperature);
  }
}

class WebService implements Observer {
  update(value: string) {
    console.log(`New value in web service is ${value}`);
  }
}

class MobileApp implements Observer {
  update(value: string) {
    console.log(`New value in mobile app is ${value}`);
  }
}

export const handleWeatherStation = () => {
  const weatherStation = new WeatherStation();

  const mobileApp = new MobileApp();
  weatherStation.subscribe(mobileApp);

  const webService = new WebService();
  weatherStation.subscribe(webService);

  weatherStation.updateTemperatureReading();
  console.log("Value was updated");
  weatherStation.updateTemperatureReading();

  weatherStation.unsubscribe(webService);
  console.log("Web service unsubscribed");
  weatherStation.updateTemperatureReading();
}
