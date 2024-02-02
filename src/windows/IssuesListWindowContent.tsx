import { useContext } from 'react';
import IssuesTable from 'src/components/IssuesTable';
import WindowsContext from 'src/context/WindowsContext';
import { Issue, useGetIssuesQuery } from 'src/service/issues';
import IssueWindowContent from './IssueWindowContent';

function IssuesListWindowContent() {
  const { data: issues, isLoading } = useGetIssuesQuery();
  const { openWindow } = useContext(WindowsContext);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!issues) {
    return <div>Нет ни одной задачи :(</div>;
  }

  const openIssue = (issueNumber: number) => {
    console.log('open issue', issueNumber);
    const issueWindow = IssueWindowContent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (issueWindow as any).params = {
      number: issueNumber,
      id: `${issueWindow.windowId}_${issueNumber}`,
    };
    issueWindow.title = `Задача #${issueNumber}`;
    openWindow(issueWindow);
  };

  return (
    <div style={{ overflow: 'auto', overflowY: 'auto' }}>
      <IssuesTable data={issues} onDoubleRowClick={openIssue} />
    </div>
  );
}

IssuesListWindowContent.windowId = 'IssuesListWindow';
IssuesListWindowContent.title = 'Список задач';
IssuesListWindowContent.minHeight = 350;
IssuesListWindowContent.minWidth = 630;

export default IssuesListWindowContent;
