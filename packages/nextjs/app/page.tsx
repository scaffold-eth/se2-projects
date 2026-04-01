"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { ArrowTopRightOnSquareIcon, ClockIcon, CodeBracketIcon, StarIcon } from "@heroicons/react/24/outline";
import { RepositoryStats } from "~~/types/repository";

const RankBadge = ({ index }: { index: number }) => {
  if (index === 0) {
    return (
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-yellow-400 text-yellow-900 shrink-0">
        1
      </span>
    );
  }
  if (index === 1) {
    return (
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-300 text-gray-700 shrink-0">
        2
      </span>
    );
  }
  if (index === 2) {
    return (
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-amber-600 text-white shrink-0">
        3
      </span>
    );
  }
  return <span className="w-6 text-center text-sm text-base-content/40 font-mono shrink-0">{index + 1}</span>;
};

const Home: NextPage = () => {
  const [stats, setStats] = useState<RepositoryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/repositories/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch repository statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <span>Error loading repository statistics: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5 text-center">
          <h1>
            <span className="block text-2xl mb-2 text-base-content/60">Projects using</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <p className="text-base-content/50 max-w-md mx-auto mt-3 text-sm leading-relaxed">
            Discover open-source projects built with Scaffold-ETH 2, the open-source toolkit for Ethereum dApps.
          </p>
        </div>

        {stats && (
          <div className="w-full max-w-6xl px-4 py-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="stat bg-base-100 rounded-xl shadow">
                <div className="stat-figure text-primary">
                  <CodeBracketIcon className="h-8 w-8" />
                </div>
                <div className="stat-title text-base-content/70">Total Repositories</div>
                <div className="stat-value text-base-content">{stats.totalRepos.toLocaleString()}</div>
              </div>

              <div className="stat bg-base-100 rounded-xl shadow">
                <div className="stat-figure text-warning">
                  <StarIcon className="h-8 w-8" />
                </div>
                <div className="stat-title text-base-content/70">Total Stars</div>
                <div className="stat-value text-base-content">{stats.totals.totalStars.toLocaleString()}</div>
              </div>

              <div className="stat bg-base-100 rounded-xl shadow">
                <div className="stat-figure text-primary">
                  <svg className="h-8 w-8" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                  </svg>
                </div>
                <div className="stat-title text-base-content/70">Total Forks</div>
                <div className="stat-value text-base-content">{stats.totals.totalForks.toLocaleString()}</div>
              </div>

              <div className="stat bg-base-100 rounded-xl shadow">
                <div className="stat-figure text-success">
                  <ClockIcon className="h-8 w-8" />
                </div>
                <div className="stat-title text-base-content/70">Recent (30 days)</div>
                <div className="stat-value text-base-content">{stats.savedLast30Days.toLocaleString()}</div>
                <div className="stat-desc text-base-content/50">new repositories</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Repositories by Stars */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title mb-2">
                    <StarIcon className="h-5 w-5 text-warning" />
                    Top Repositories by Stars
                  </h2>
                  <div className="space-y-1">
                    {stats.topStars.map((repo, index) => (
                      <div
                        key={repo.full_name}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors"
                      >
                        <RankBadge index={index} />
                        <div className="flex-1 min-w-0">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-base-content hover:opacity-75 transition-opacity flex items-center gap-1"
                          >
                            <span className="truncate">{repo.name}</span>
                            <ArrowTopRightOnSquareIcon className="h-3 w-3 shrink-0 opacity-40" />
                          </a>
                          <div className="text-xs text-base-content/50 truncate">{repo.owner}</div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-sm">
                          <span className="flex items-center gap-1 text-base-content font-medium">
                            <StarIcon className="h-3.5 w-3.5 text-warning" />
                            {repo.stars.toLocaleString()}
                          </span>
                          <span className="text-base-content/40 hidden sm:inline">
                            {repo.forks.toLocaleString()} forks
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Owners */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title mb-2">
                    <CodeBracketIcon className="h-5 w-5 text-primary" />
                    Top Repository Owners
                  </h2>
                  <div className="space-y-1">
                    {stats.topOwners.map((owner, index) => (
                      <div
                        key={owner.owner}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors"
                      >
                        <RankBadge index={index} />
                        <div className="flex-1 min-w-0">
                          <a
                            href={`https://github.com/${owner.owner}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-base-content hover:opacity-75 transition-opacity flex items-center gap-1"
                          >
                            <span className="truncate">{owner.owner}</span>
                            <ArrowTopRightOnSquareIcon className="h-3 w-3 shrink-0 opacity-40" />
                          </a>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-sm">
                          <span className="text-base-content/50">{owner.repo_count} repos</span>
                          <span className="flex items-center gap-1 text-base-content font-medium">
                            <StarIcon className="h-3.5 w-3.5 text-warning" />
                            {parseInt(owner.total_stars.toString()).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
