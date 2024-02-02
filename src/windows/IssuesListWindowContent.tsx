/* eslint-disable jsx-a11y/anchor-is-valid */
import IssuesTable from 'src/components/IssuesTable';
import { Issue, useGetIssuesQuery } from 'src/service/issues';

function PostListItem({
  data: { title, number },
  onSelect,
}: {
  data: Issue;
  onSelect: (id: number) => void;
}) {
  return (
    <li>
      <a href="#" onClick={() => onSelect(number)}>
        {title}
      </a>
    </li>
  );
}
function IssuesListWindowContent() {
  const { data: issues, isLoading } = useGetIssuesQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!issues) {
    return <div>Нет ни одной задачи :(</div>;
  }

  return (
    <div style={{ overflow: 'auto', overflowY: 'auto' }}>
      {/* {issues.map((issue) => (
        <PostListItem
          key={issue.id}
          data={issue}
          onSelect={(id) => console.log(`/lol/${id}`)}
        />
      ))} */}

      <IssuesTable data={issues} />
    </div>
  );
}

IssuesListWindowContent.windowId = 'IssuesListWindow';
IssuesListWindowContent.title = 'Issues list';

export default IssuesListWindowContent;
