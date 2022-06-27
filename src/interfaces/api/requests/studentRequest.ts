export interface RequestAddProfessorInHistory {
    userId: string,
    currentProfessorHistoryId: string,
    newProfessorId: string,
    createdAt: Date,
    comments: string,
}

export interface RequestUpdateProfessorInHistory {
    userId: string,
    professorHistoryId: string,
    createdAt: Date,
    professorId: String,
    comments: string,
    professorBeforeId: string,
}

export interface RequestDeleteProfessorInHistory {
    userId: string,
    professorHistoryId: string
}
