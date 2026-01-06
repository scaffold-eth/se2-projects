"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { RepositoryStats } from "~~/types/repository";

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-base-content/30"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-error mb-2">Failed to load data</p>
          <p className="text-sm text-base-content/50">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {stats && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-base-200/50 rounded-xl p-5">
              <div className="text-sm font-medium text-base-content/50 mb-1">Repositories</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono">{stats.totalRepos.toLocaleString()}</div>
            </div>
            <div className="bg-base-200/50 rounded-xl p-5">
              <div className="text-sm font-medium text-base-content/50 mb-1">Total Stars</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono">{stats.totals.totalStars.toLocaleString()}</div>
            </div>
            <div className="bg-base-200/50 rounded-xl p-5">
              <div className="text-sm font-medium text-base-content/50 mb-1">Total Forks</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono">{stats.totals.totalForks.toLocaleString()}</div>
            </div>
            <div className="bg-base-200/50 rounded-xl p-5">
              <div className="text-sm font-medium text-base-content/50 mb-1">New This Week</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono">{stats.recentRepos.toLocaleString()}</div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top Repositories */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Top Repositories</h2>
                <Link
                  href="/repositories"
                  className="text-sm text-base-content/50 hover:text-base-content flex items-center gap-1 transition-colors"
                >
                  View all <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {stats.topStars.slice(0, 8).map((repo, index) => (
                  <a
                    key={repo.full_name}
                    href={`https://github.com/${repo.full_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200/70 transition-colors group"
                  >
                    <span className="text-base-content/30 font-mono text-sm w-5 text-right">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate group-hover:text-accent transition-colors">{repo.name}</div>
                      <div className="text-sm text-base-content/50 truncate">{repo.owner}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono font-medium">{repo.stars.toLocaleString()}</div>
                      <div className="text-xs text-base-content/40">stars</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Top Contributors */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Top Contributors</h2>
              </div>
              <div className="space-y-2">
                {stats.topOwners.slice(0, 8).map((owner, index) => (
                  <a
                    key={owner.owner}
                    href={`https://github.com/${owner.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200/70 transition-colors group"
                  >
                    <span className="text-base-content/30 font-mono text-sm w-5 text-right">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate group-hover:text-accent transition-colors">
                        {owner.owner}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-right shrink-0">
                      <div>
                        <div className="font-mono font-medium">{owner.repo_count}</div>
                        <div className="text-xs text-base-content/40">repos</div>
                      </div>
                      <div>
                        <div className="font-mono font-medium">
                          {parseInt(owner.total_stars.toString()).toLocaleString()}
                        </div>
                        <div className="text-xs text-base-content/40">stars</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
