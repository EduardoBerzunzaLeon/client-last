export interface InitialValues {
    semester: number,
    userId: string,
    phaseStatus: { code: string, name: string },
    subject?: { _id: string, name: string, semester: number}
    phaseId: string,
  }

export interface UserContext {
    id: string,
    semester: number,
}
