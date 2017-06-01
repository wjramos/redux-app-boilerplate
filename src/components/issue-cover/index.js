import React from 'react';
import { Placeholder, Card, Badge, Sticky, ProgressBar } from '..';

const Progress = ({ percent }) => percent > 0 && percent < 100 ? (
  <Sticky>
    <ProgressBar percent={percent} />
  </Sticky>
) : null;

export default ({ issue, percent }) => (
  <Card onClick={() => {}}>
    <Badge status={percent === 100 ? 'success' : null} />
    <Placeholder src={issue.asset_thumbnail.asset_path_signed} />
    <h3>
      {issue.$name || issue.issue_coverDisplayDate}
    </h3>
    <Progress percent={percent} />
  </Card>
);
