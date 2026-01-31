export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAgentDto {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export interface UpdateAgentDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
}
