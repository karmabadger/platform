export enum JobState {
  Available = 1,
  Started = 2,
  Completed = 3,
  Disputed = 4,
  FinalApproved = 5,
  FinalCanceledBySupplier = 6,
  FinalMutualClose = 7,
  FinalNoResponse = 8,
  FinalDisputeResolvedForSupplier = 9,
  FinalDisputeResolvedForEngineer = 10,
  FinalDisputeResolvedWithSplit = 11,
}

export const JobStateLabels = {
  [JobState.Available]: 'Available',
  [JobState.Started]: 'Started',
  [JobState.Completed]: 'Completed',
  [JobState.Disputed]: 'Disputed',
  [JobState.FinalApproved]: 'Paid',
  [JobState.FinalCanceledBySupplier]: 'Canceled',
  [JobState.FinalMutualClose]: 'Closed',
  [JobState.FinalNoResponse]: 'Abandoned',
  [JobState.FinalDisputeResolvedForSupplier]: 'Dispute Resolved',
  [JobState.FinalDisputeResolvedForEngineer]: 'Dispute Resolved',
  [JobState.FinalDisputeResolvedWithSplit]: 'Dispute Resolved',
};
