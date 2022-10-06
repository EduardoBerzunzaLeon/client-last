export interface GenerateCareer {
    userId: string,
    subjectsInSemester: number,
    canAdvanceSubject: boolean,
    hasValidation: boolean,
}

export interface UpdateCareer extends GenerateCareer{
    subjectId: string,
    newSemester: string,
}
