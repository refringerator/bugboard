/* eslint-disable jsx-a11y/anchor-is-valid */
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
    return <div>Loading</div>;
  }

  if (!issues) {
    return <div>No issues :(</div>;
  }

  return (
    <div>
      {issues.map((issue) => (
        <PostListItem
          key={issue.id}
          data={issue}
          onSelect={(id) => console.log(`/lol/${id}`)}
        />
      ))}
    </div>
  );
}

IssuesListWindowContent.windowId = 'IssuesListWindow';
IssuesListWindowContent.title = 'Issues list';

export default IssuesListWindowContent;
