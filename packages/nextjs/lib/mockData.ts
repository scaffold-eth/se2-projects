export interface Repository {
  id: number;
  full_name: string;
  name: string;
  owner: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  created_at: string;
  updated_at: string;
  last_seen: string;
  saved_at: string;
  source: string[];
}

const now = new Date();
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const mockRepositories: Repository[] = [
  {
    id: 1,
    full_name: "scaffold-eth/scaffold-eth-2",
    name: "scaffold-eth-2",
    owner: "scaffold-eth",
    url: "https://github.com/scaffold-eth/scaffold-eth-2",
    homepage: "https://scaffoldeth.io",
    stars: 1808,
    forks: 1143,
    created_at: daysAgo(730),
    updated_at: daysAgo(1),
    last_seen: daysAgo(0),
    saved_at: daysAgo(30),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 2,
    full_name: "BuidlGuidl/abi.ninja",
    name: "abi.ninja",
    owner: "BuidlGuidl",
    url: "https://github.com/BuidlGuidl/abi.ninja",
    homepage: "https://abi.ninja",
    stars: 215,
    forks: 100,
    created_at: daysAgo(540),
    updated_at: daysAgo(3),
    last_seen: daysAgo(0),
    saved_at: daysAgo(25),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 3,
    full_name: "BuidlGuidl/speedrunethereum",
    name: "speedrunethereum",
    owner: "BuidlGuidl",
    url: "https://github.com/BuidlGuidl/speedrunethereum",
    homepage: "https://speedrunethereum.com",
    stars: 452,
    forks: 189,
    created_at: daysAgo(600),
    updated_at: daysAgo(5),
    last_seen: daysAgo(1),
    saved_at: daysAgo(28),
    source: ["se2-template-search"],
  },
  {
    id: 4,
    full_name: "austintgriffith/scaffold-eth",
    name: "scaffold-eth",
    owner: "austintgriffith",
    url: "https://github.com/austintgriffith/scaffold-eth",
    homepage: null,
    stars: 2800,
    forks: 1500,
    created_at: daysAgo(1200),
    updated_at: daysAgo(60),
    last_seen: daysAgo(2),
    saved_at: daysAgo(30),
    source: ["original-se"],
  },
  {
    id: 5,
    full_name: "scaffold-eth/eth-hooks",
    name: "eth-hooks",
    owner: "scaffold-eth",
    url: "https://github.com/scaffold-eth/eth-hooks",
    homepage: null,
    stars: 320,
    forks: 85,
    created_at: daysAgo(800),
    updated_at: daysAgo(30),
    last_seen: daysAgo(1),
    saved_at: daysAgo(20),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 6,
    full_name: "damianmarti/fruit-market",
    name: "fruit-market",
    owner: "damianmarti",
    url: "https://github.com/damianmarti/fruit-market",
    homepage: null,
    stars: 45,
    forks: 12,
    created_at: daysAgo(180),
    updated_at: daysAgo(10),
    last_seen: daysAgo(0),
    saved_at: daysAgo(5),
    source: ["se2-template-search"],
  },
  {
    id: 7,
    full_name: "technophile-04/se2-nft-example",
    name: "se2-nft-example",
    owner: "technophile-04",
    url: "https://github.com/technophile-04/se2-nft-example",
    homepage: null,
    stars: 89,
    forks: 34,
    created_at: daysAgo(365),
    updated_at: daysAgo(15),
    last_seen: daysAgo(1),
    saved_at: daysAgo(10),
    source: ["se2-template-search"],
  },
  {
    id: 8,
    full_name: "carletex/eip-712-demo",
    name: "eip-712-demo",
    owner: "carletex",
    url: "https://github.com/carletex/eip-712-demo",
    homepage: null,
    stars: 156,
    forks: 42,
    created_at: daysAgo(420),
    updated_at: daysAgo(20),
    last_seen: daysAgo(2),
    saved_at: daysAgo(15),
    source: ["burner-connector-dependents-webscraping", "se2-template-search"],
  },
  {
    id: 9,
    full_name: "BuidlGuidl/batch6.buidlguidl.com",
    name: "batch6.buidlguidl.com",
    owner: "BuidlGuidl",
    url: "https://github.com/BuidlGuidl/batch6.buidlguidl.com",
    homepage: "https://batch6.buidlguidl.com",
    stars: 28,
    forks: 45,
    created_at: daysAgo(90),
    updated_at: daysAgo(2),
    last_seen: daysAgo(0),
    saved_at: daysAgo(3),
    source: ["se2-template-search"],
  },
  {
    id: 10,
    full_name: "0xSimon/defi-dashboard",
    name: "defi-dashboard",
    owner: "0xSimon",
    url: "https://github.com/0xSimon/defi-dashboard",
    homepage: null,
    stars: 112,
    forks: 28,
    created_at: daysAgo(300),
    updated_at: daysAgo(7),
    last_seen: daysAgo(1),
    saved_at: daysAgo(8),
    source: ["se2-template-search"],
  },
  {
    id: 11,
    full_name: "0xCryptoQueen/nft-marketplace",
    name: "nft-marketplace",
    owner: "0xCryptoQueen",
    url: "https://github.com/0xCryptoQueen/nft-marketplace",
    homepage: "https://nftmarketplace.example.com",
    stars: 289,
    forks: 67,
    created_at: daysAgo(400),
    updated_at: daysAgo(12),
    last_seen: daysAgo(1),
    saved_at: daysAgo(14),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 12,
    full_name: "ethereumbuilder/dao-template",
    name: "dao-template",
    owner: "ethereumbuilder",
    url: "https://github.com/ethereumbuilder/dao-template",
    homepage: null,
    stars: 178,
    forks: 56,
    created_at: daysAgo(350),
    updated_at: daysAgo(25),
    last_seen: daysAgo(3),
    saved_at: daysAgo(20),
    source: ["se2-template-search"],
  },
  {
    id: 13,
    full_name: "web3wizard/token-swap",
    name: "token-swap",
    owner: "web3wizard",
    url: "https://github.com/web3wizard/token-swap",
    homepage: null,
    stars: 95,
    forks: 23,
    created_at: daysAgo(250),
    updated_at: daysAgo(18),
    last_seen: daysAgo(2),
    saved_at: daysAgo(12),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 14,
    full_name: "BuidlGuidl/grants",
    name: "grants",
    owner: "BuidlGuidl",
    url: "https://github.com/BuidlGuidl/grants",
    homepage: "https://grants.buidlguidl.com",
    stars: 67,
    forks: 35,
    created_at: daysAgo(200),
    updated_at: daysAgo(4),
    last_seen: daysAgo(0),
    saved_at: daysAgo(6),
    source: ["se2-template-search"],
  },
  {
    id: 15,
    full_name: "scaffold-eth/create-eth",
    name: "create-eth",
    owner: "scaffold-eth",
    url: "https://github.com/scaffold-eth/create-eth",
    homepage: null,
    stars: 425,
    forks: 112,
    created_at: daysAgo(300),
    updated_at: daysAgo(2),
    last_seen: daysAgo(0),
    saved_at: daysAgo(4),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 16,
    full_name: "chainguard/staking-app",
    name: "staking-app",
    owner: "chainguard",
    url: "https://github.com/chainguard/staking-app",
    homepage: null,
    stars: 134,
    forks: 41,
    created_at: daysAgo(280),
    updated_at: daysAgo(8),
    last_seen: daysAgo(1),
    saved_at: daysAgo(9),
    source: ["se2-template-search"],
  },
  {
    id: 17,
    full_name: "defimaster/yield-aggregator",
    name: "yield-aggregator",
    owner: "defimaster",
    url: "https://github.com/defimaster/yield-aggregator",
    homepage: null,
    stars: 201,
    forks: 53,
    created_at: daysAgo(320),
    updated_at: daysAgo(14),
    last_seen: daysAgo(2),
    saved_at: daysAgo(16),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 18,
    full_name: "ethdev/multi-sig-wallet",
    name: "multi-sig-wallet",
    owner: "ethdev",
    url: "https://github.com/ethdev/multi-sig-wallet",
    homepage: null,
    stars: 345,
    forks: 89,
    created_at: daysAgo(500),
    updated_at: daysAgo(22),
    last_seen: daysAgo(3),
    saved_at: daysAgo(25),
    source: ["se2-template-search", "burner-connector-dependents-webscraping"],
  },
  {
    id: 19,
    full_name: "blockchain-labs/bridge-ui",
    name: "bridge-ui",
    owner: "blockchain-labs",
    url: "https://github.com/blockchain-labs/bridge-ui",
    homepage: "https://bridge.example.com",
    stars: 167,
    forks: 44,
    created_at: daysAgo(380),
    updated_at: daysAgo(11),
    last_seen: daysAgo(1),
    saved_at: daysAgo(13),
    source: ["burner-connector-dependents-webscraping"],
  },
  {
    id: 20,
    full_name: "cryptodev123/airdrop-tool",
    name: "airdrop-tool",
    owner: "cryptodev123",
    url: "https://github.com/cryptodev123/airdrop-tool",
    homepage: null,
    stars: 78,
    forks: 19,
    created_at: daysAgo(150),
    updated_at: daysAgo(6),
    last_seen: daysAgo(0),
    saved_at: daysAgo(2),
    source: ["se2-template-search"],
  },
];

export function getMockStats() {
  const sourceMap = new Map<string, number>();
  let totalStars = 0;
  let totalForks = 0;
  const ownerMap = new Map<string, { count: number; stars: number }>();

  mockRepositories.forEach(repo => {
    totalStars += repo.stars;
    totalForks += repo.forks;

    repo.source.forEach(s => {
      sourceMap.set(s, (sourceMap.get(s) || 0) + 1);
    });

    const ownerStats = ownerMap.get(repo.owner) || { count: 0, stars: 0 };
    ownerStats.count += 1;
    ownerStats.stars += repo.stars;
    ownerMap.set(repo.owner, ownerStats);
  });

  const sourceStats = Array.from(sourceMap.entries())
    .map(([source, count]) => ({ source, count: count.toString() }))
    .sort((a, b) => parseInt(b.count) - parseInt(a.count));

  const topStars = [...mockRepositories]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 10)
    .map(r => ({
      full_name: r.full_name,
      name: r.name,
      owner: r.owner,
      stars: r.stars,
      forks: r.forks,
      url: r.url,
      source: r.source,
    }));

  const topOwners = Array.from(ownerMap.entries())
    .map(([owner, stats]) => ({
      owner,
      repo_count: stats.count.toString(),
      total_stars: stats.stars.toString(),
    }))
    .sort((a, b) => parseInt(b.repo_count) - parseInt(a.repo_count))
    .slice(0, 10);

  const recentRepos = mockRepositories.filter(r => {
    const createdAt = new Date(r.created_at);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return createdAt >= sevenDaysAgo;
  }).length;

  const recentSavedRepos = mockRepositories.filter(r => {
    const savedAt = new Date(r.saved_at);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return savedAt >= sevenDaysAgo;
  }).length;

  // Generate mock savedByDate for last 30 days
  const savedByDate = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    savedByDate.push({
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5) + 1,
    });
  }

  return {
    totalRepos: mockRepositories.length,
    deletedRepos: 3,
    sourceStats,
    topStars,
    recentRepos,
    recentSavedRepos,
    savedByDate,
    totals: {
      totalStars,
      totalForks,
    },
    topOwners,
  };
}
