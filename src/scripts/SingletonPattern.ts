/*
  RESOURCES:
  https://refactoring.guru/design-patterns/singleton
  https://www.youtube.com/watch?v=hUE_j6q0LTQ
 */

class Singleton {
  private static instance: Singleton

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() { }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance
  }

  public someBusinessLogic() {
    console.log('Some logic')
  }
}

export const singletonPattern = () => {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }
}
