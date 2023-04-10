import { rest } from 'msw';

export const studentsDataMock = {
  status: 'success',
  total: 5,
  data: [
    {
      id: '62b76453f531ac361428255f',
      name: {
        first: 'Josefina Plasma',
        last: 'Berzunza Bernés',
      },
      fullname: 'josefina plasma berzunza bernés',
      email: 'josefina.berzunza@uacam.mx',
      active: true,
      gender: 'F',
      professor: {
        id: '62b76003f531ac3614282511',
        name: {
          first: 'floribeth',
          last: 'león peréz',
        },
        avatar: 'http://localhost:4000/img/fe6feaae9cc9842ddd004dd85a78cb.jpg',
      },
      atRisk: 'no termina',
      inChannelling: 'no',
      enrollment: 'al23560',
      status: {
        createdAt: '2023-03-27T18:12:30.847Z',
        _id: '62b76453f531ac3614282565',
        status: 'regular',
      },
      studentId: '62b76453f531ac3614282563',
      currentSemester: 2,
      classroom: 'A',
      avatar: 'http://localhost:4000/img/8c0a7af4c3777a5d07c0b7e61bd759.jpg',
    },
    {
      id: '63993d680227aa23944718db',
      name: {
        first: 'Dash',
        last: 'Castillo',
      },
      fullname: 'dash castillo',
      email: 'dash.castillo@uacam.mx',
      active: true,
      gender: 'M',
      professor: {
        id: '608064aa1d7963091081ab5d',
        name: {
          first: 'eduardo jesús',
          last: 'berzunza león',
        },
        avatar: 'http://localhost:4000/img/3890d173739ede982f310ebb9d2e9e.jpg',
      },
      atRisk: 'no',
      inChannelling: 'no',
      enrollment: 'al36630',
      status: {
        createdAt: '2023-03-27T18:12:30.847Z',
        _id: '63993d680227aa23944718e1',
        status: 'regular',
      },
      studentId: '63993d680227aa23944718df',
      currentSemester: 5,
      classroom: 'A',
      avatar: 'http://localhost:4000/img/2be55b92dd903f0c57b1b4262067ad.jpg',
    },
  ],
};

export const mockGetStudents = rest.get<string>(
  `${process.env.REACT_APP_API_URL}/students`,
  (req, res, ctx) => {
    const semester: string | null = req.url.searchParams.get('currentSemester');

    if (!semester) {
      return res(
        ctx.status(200),
        ctx.json(studentsDataMock),
      );
    }

    const filteredStudents = studentsDataMock.data.filter(
      ({ currentSemester }) => currentSemester === parseInt(semester, 10),
    );

    return res(
      ctx.status(200),
      ctx.json(filteredStudents),
    );
  },
);

export default {
  mockGetStudents,
};
