import IssuesTable from 'src/components/IssuesTable';
import { Issue, useGetIssuesQuery } from 'src/service/issues';

// function PostListItem({
//   data: { title, number },
//   onSelect,
// }: {
//   data: Issue;
//   onSelect: (id: number) => void;
// }) {
//   return (
//     <li>
//       <a href="#" onClick={() => onSelect(number)}>
//         {title}
//       </a>
//     </li>
//   );
// }
function IssuesListWindowContent() {
  const { data: issues, isLoading } = useGetIssuesQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!issues) {
    return <div>Нет ни одной задачи :(</div>;
  }

  const openIssue = (issueNumber: number) => {
    console.log('open issue', issueNumber);
  };

  return (
    <div style={{ overflow: 'auto', overflowY: 'auto' }}>
      {/* {issues.map((issue) => (
        <PostListItem
          key={issue.id}
          data={issue}
          onSelect={(id) => console.log(`/lol/${id}`)}
        />
      ))} */}

      <IssuesTable data={issues} onDoubleRowClick={openIssue} />
    </div>
  );
}

IssuesListWindowContent.windowId = 'IssuesListWindow';
IssuesListWindowContent.title = 'Список задач';
IssuesListWindowContent.minHeight = 350;
IssuesListWindowContent.minWidth = 630;

export default IssuesListWindowContent;
