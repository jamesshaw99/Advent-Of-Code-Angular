import { year2019day25 } from '../day25';

describe('2019 day25', () => {
  let instance: year2019day25;

  beforeEach(() => {
    instance = new year2019day25();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parse = (text: string) => (instance as any).parseResponse(text);

  it('parses a room with doors and no items', () => {
    const text = '\n\n== Hull Breach ==\nYou got in through a hole in the floor here. To keep your ship from also freezing,' +
      ' the hole has been patched.\n\nDoors here lead:\n- north\n- east\n- south\n\nCommand?\n';

    expect(parse(text)).toEqual({
      isRoom: true,
      name: 'Hull Breach',
      doors: ['north', 'east', 'south'],
      items: []
    });
  });

  it('parses a room with doors and items', () => {
    const text = '\n\n== Kitchen ==\nYou see a whiteboard with plans for a chicken coop.\n\nDoors here lead:\n- north\n- east' +
      '\n\nItems here:\n- weather machine\n\nCommand?\n';

    expect(parse(text)).toEqual({
      isRoom: true,
      name: 'Kitchen',
      doors: ['north', 'east'],
      items: ['weather machine']
    });
  });

  it('recognises a rejected checkpoint attempt even though it re-displays the room heading', () => {
    const text = '\n\n== Pressure-Sensitive Floor ==\nAnalyzing...\n\nDoors here lead:\n- south\n\nA loud, robotic voice says' +
      ' "Alert! Droids on this ship are heavier than the detected value!" and you are ejected back to the checkpoint.\n\n\nCommand?\n';

    expect(parse(text)).toEqual({ isRoom: false, isCheckpointAttempt: true, success: false, securityCode: null });
  });

  it('recognises a successful checkpoint attempt and extracts the security code', () => {
    const text = '\n\n== Pressure-Sensitive Floor ==\nAnalyzing...\n\nDoors here lead:\n- south\n\nA loud, robotic voice says' +
      ' "Analysis complete! You may proceed." and you enter the cockpit.\n\nOh, hello! You should be able to get in by typing' +
      ' 43 on the keypad at the main airlock.\n';

    expect(parse(text)).toEqual({ isRoom: false, isCheckpointAttempt: true, success: true, securityCode: 43 });
  });

  it('recognises an unparseable response as neither a room nor a checkpoint attempt', () => {
    const text = '\nThe giant electromagnet is stuck to you.  You can\'t move!!\n\nCommand?\n';

    expect(parse(text)).toEqual({ isRoom: false, isCheckpointAttempt: false });
  });
});
