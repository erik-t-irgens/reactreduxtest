import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as c from './../../actions/ActionTypes';
import { formatDistanceToNow } from 'date-fns';

describe('ticketListReducer', () => {
	
  const currentState = {
    1: {
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1 
    }, 
    2: {
      names: 'Jasmine and Justine',
      location: '2a',
      issue: 'Reducer has side effects.',
      id: 2 
    }
  }

  let action;

  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    timeOpen : new Date(),
    formattedWaitTime: formatDistanceToNow(new Date(), {
      addSuffix: true
    }),
    id: 1
  };

  test('should successfully add a ticket to the ticket list that includes date-fns-formatted wait times', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
	});
	
	test('Should successfully add new ticket data to mainTicketList', () => {
    const { names, location, issue, id, timeOpen, formattedWaitTime } = ticketData;
    action = {
      type: c.ADD_TICKET,
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      formattedWaitTime: formattedWaitTime,
      id: id,
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: 'less than a minute ago'
      }
    });
  });

  test('Should successfully update existing ticket data in mainTicketList', () => {
    const { names, location, issue, id } = ticketData;

    action = {
      type: c.ADD_TICKET,
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    const newState = ticketListReducer({}, action);

    action = {
      type: c.ADD_TICKET,
      names: "harvey",
      location: "3b",
      issue: "halp",
      id: 1
    };

    const newState2 = ticketListReducer(newState, action);

    expect(newState2).toEqual({
      [id] : {
        names: "harvey",
        location: "3b",
        issue: "halp",
        id: id
      }
    });
  });

  test('Should successfully update only issue property of existing ticket data in mainTicketList', () => {
    const { names, location, issue, id } = ticketData;

    action = {
      type: c.ADD_TICKET,
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    const newState = ticketListReducer({}, action);

    action = {
      type: c.UPDATE_TICKET_ISSUE,
      issue: "actually meant to ask about mapStateToProps()",
      id: 1
    };

    const newState2 = ticketListReducer(newState, action);

    expect(newState2).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: "actually meant to ask about mapStateToProps()",
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: c.DELETE_TICKET,
      id: 1
    };

    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 
      }
    });
  });

  test('Should add a formatted wait time to ticket entry', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes ago',
      id: id
    };
    expect(ticketListReducer({ [id] : ticketData }, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes ago'
      }
    });
  });
});