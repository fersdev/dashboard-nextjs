interface StatsProps {
  statNumber: string | undefined;
  statText: string;
}

export function StatsComponent({ statNumber, statText }: StatsProps) {
  return (
    <>
      <dt className="mb-2 text-2xl md:text-3xl font-extrabold">{statNumber}</dt>
      <dd className="font-light text-gray-500 dark:text-gray-400">
        {statText}
      </dd>
    </>
  );
}
