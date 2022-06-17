USE [master]
GO
/****** Object:  Database [Brewing]    Script Date: 6/16/2022 8:35:59 PM ******/
CREATE DATABASE [Brewing]
    CONTAINMENT = NONE
    ON  PRIMARY
    ( NAME = N'Brewing', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Brewing.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
    LOG ON
    ( NAME = N'Brewing_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Brewing_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Brewing] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
    begin
        EXEC [Brewing].[dbo].[sp_fulltext_database] @action = 'enable'
    end
GO
ALTER DATABASE [Brewing] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [Brewing] SET ANSI_NULLS OFF
GO
ALTER DATABASE [Brewing] SET ANSI_PADDING OFF
GO
ALTER DATABASE [Brewing] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [Brewing] SET ARITHABORT OFF
GO
ALTER DATABASE [Brewing] SET AUTO_CLOSE ON
GO
ALTER DATABASE [Brewing] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [Brewing] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [Brewing] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [Brewing] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [Brewing] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [Brewing] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [Brewing] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [Brewing] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [Brewing] SET  ENABLE_BROKER
GO
ALTER DATABASE [Brewing] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [Brewing] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [Brewing] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [Brewing] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [Brewing] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [Brewing] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [Brewing] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [Brewing] SET RECOVERY SIMPLE
GO
ALTER DATABASE [Brewing] SET  MULTI_USER
GO
ALTER DATABASE [Brewing] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [Brewing] SET DB_CHAINING OFF
GO
ALTER DATABASE [Brewing] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF )
GO
ALTER DATABASE [Brewing] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE [Brewing] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE [Brewing] SET ACCELERATED_DATABASE_RECOVERY = OFF
GO
ALTER DATABASE [Brewing] SET QUERY_STORE = OFF
GO
USE [Brewing]
GO
/****** Object:  Table [dbo].[Attempts]    Script Date: 6/16/2022 8:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attempts](
                                 [Id] [int] IDENTITY(1,1) NOT NULL,
                                 [TimeTaken] [time](7) NOT NULL,
                                 [Points] [int] NOT NULL,
                                 [DateOn] [date] NOT NULL,
                                 [UserId] [int] NOT NULL,
                                 CONSTRAINT [PK_Attempts] PRIMARY KEY CLUSTERED
                                     (
                                      [Id] ASC
                                         )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaderboardPoints]    Script Date: 6/16/2022 8:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaderboardPoints](
                                          [UserId] [int] NOT NULL,
                                          [Points] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaderboardTime]    Script Date: 6/16/2022 8:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaderboardTime](
                                        [UserId] [int] NOT NULL,
                                        [TimeTaken] [time](7) NOT NULL,
                                        [DateOn] [date] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/16/2022 8:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
                              [Id] [int] IDENTITY(1,1) NOT NULL,
                              [Username] [varchar](64) NOT NULL,
                              [Password] [varchar](256) NOT NULL,
                              [Salt] [varchar](64) NOT NULL,
                              [SumOfPoints] [int] NOT NULL,
                              CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED
                                  (
                                   [Id] ASC
                                      )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
                              UNIQUE NONCLUSTERED
                                  (
                                   [Username] ASC
                                      )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [SumOfPoints]
GO
ALTER TABLE [dbo].[Attempts]  WITH CHECK ADD  CONSTRAINT [FK_Attempts_UserID_Users_ID] FOREIGN KEY([UserId])
    REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Attempts] CHECK CONSTRAINT [FK_Attempts_UserID_Users_ID]
GO
ALTER TABLE [dbo].[LeaderboardPoints]  WITH CHECK ADD  CONSTRAINT [FK_LeaderboardPoints_UserId_Users_Id] FOREIGN KEY([UserId])
    REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[LeaderboardPoints] CHECK CONSTRAINT [FK_LeaderboardPoints_UserId_Users_Id]
GO
ALTER TABLE [dbo].[LeaderboardTime]  WITH CHECK ADD  CONSTRAINT [FK_LeaderboardTime_UserId_Users_Id] FOREIGN KEY([UserId])
    REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[LeaderboardTime] CHECK CONSTRAINT [FK_LeaderboardTime_UserId_Users_Id]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [CHK_Username] CHECK  ((len([Username])>=(8)))
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [CHK_Username]
GO
USE [master]
GO
ALTER DATABASE [Brewing] SET  READ_WRITE
GO
