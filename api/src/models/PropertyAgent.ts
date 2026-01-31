export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAgentDto = Pick<PropertyAgent, 'firstName' | 'lastName' | 'email' | 'mobileNumber'>;

export type UpdateAgentDto = Partial<CreateAgentDto>;
