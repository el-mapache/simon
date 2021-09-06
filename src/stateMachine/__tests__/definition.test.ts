import { interpret, Machine } from 'robot3';
import MachineActionTypes from 'stateMachine/actionTypes';
import machine from 'stateMachine/definition';
import MachineStates from 'stateMachine/statesMap';
import SimonState from 'stateMachine/types/simonState';

jest.useFakeTimers();

const interpreter = <Context = {}>(machine: Machine<{}, Context, string>) =>
  interpret(machine, function (service) {
    console.log('transition change?', { service });
  });

describe('stateDefinition', () => {
  it('begins in the idle state', () => {
    const service = interpreter<SimonState>(machine);
    expect(service.machine.current).toBe(MachineStates.Idle);
  });

  it('when idle, returns to idle after a button is  pushed', () => {
    const service = interpreter<SimonState>(machine);
    service.send({
      type: MachineActionTypes.UserInput,
      data: { activeSquare: 'yellow' },
    });

    expect(service.machine.current).toBe('playSound');
    expect(service.context.activeSquare).toBe('yellow');

    setTimeout(() => {
      expect(service.machine.current).toBe(MachineStates.Idle);
    }, 1000);
    jest.advanceTimersByTime(1000);
  });

  it('transitions to a new game correctly', () => {
    // const service = interpreter(machine);
    // console.log(service);
    // service.send(MachineActionTypes.NewGame);
    // service.send(MachineActionTypes.NewGame);
    // console.log(service);
  });
});

export {};
