/* eslint-disable no-unused-vars */

/**
  * This is a TypeGen auto-generated file.
  * Any changes made to this file can be lost when this file is regenerated.
  * */

import EventState from './event-state';
import Participant from './participant';

interface GiftEvent {
  id: string | null | undefined;
  orginizerId: number;
  state: EventState;
  participants: Participant[];
}
export default GiftEvent;
