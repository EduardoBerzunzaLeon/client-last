export interface InitialValues {
    semester: number,
    userId: string,
    phaseStatus: { code: string, name: string },
    subject: string
  }

export interface UserContext {
    id: string,
    semester: number,
}
