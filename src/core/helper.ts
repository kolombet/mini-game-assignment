export default class Helper {
  static getRandomElement(elements: string[]) {
    return elements[Math.floor(Math.random() * elements.length)];
  }
}
